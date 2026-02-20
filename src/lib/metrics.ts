import { readFile } from "node:fs/promises";
import Papa from "papaparse";
import type {
  MetricBatchDefinition,
  MetricTrendsData,
} from "@/types/metrics";

type CsvRow = Record<string, string | undefined> & {
  Month?: string;
  Client?: string;
};

type MonthAggregate = {
  sum: number;
  count: number;
  comments: string[];
};

type MetricAggregate = Map<string, Map<string, MonthAggregate>>;
type AggregateByMetric = Map<string, MetricAggregate>;

export type MetricTrendsOptions = {
  valueColumn: string;
  commentsColumn?: string;
  csvPath: string;
};

function monthNameToIndex(monthName: string): number | null {
  const parsed = new Date(`${monthName.trim()} 1, 2000 UTC`);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed.getUTCMonth();
}

function parseMonthValue(monthValue: string): Date | null {
  const match = monthValue.trim().match(/^([A-Za-z\u00C0-\u017F]+)\s+(\d{4})$/);
  if (!match) return null;

  const [, monthName, yearRaw] = match;
  const monthIndex = monthNameToIndex(monthName);
  if (monthIndex === null) {
    return null;
  }

  const year = Number(yearRaw);
  if (Number.isNaN(year)) {
    return null;
  }

  return new Date(Date.UTC(year, monthIndex, 1));
}

function toMonthKey(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function toMonthLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function parseCsvRows(csvText: string): CsvRow[] {
  const parsed = Papa.parse<CsvRow>(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors.length > 0) {
    throw new Error(`CSV parsing failed with ${parsed.errors.length} error(s).`);
  }

  return parsed.data;
}

function initializeAggregate(metrics: MetricBatchDefinition[]): AggregateByMetric {
  const aggregateByMetric: AggregateByMetric = new Map();
  for (const metric of metrics) {
    aggregateByMetric.set(metric.id, new Map());
  }
  return aggregateByMetric;
}

function getOrCreateBucket(
  aggregate: MetricAggregate,
  client: string,
  monthKey: string,
): MonthAggregate {
  if (!aggregate.has(client)) {
    aggregate.set(client, new Map());
  }

  const clientMap = aggregate.get(client);
  if (!clientMap) {
    return { sum: 0, count: 0, comments: [] };
  }

  if (!clientMap.has(monthKey)) {
    clientMap.set(monthKey, { sum: 0, count: 0, comments: [] });
  }

  return clientMap.get(monthKey) ?? { sum: 0, count: 0, comments: [] };
}

function accumulateRow(
  row: CsvRow,
  metrics: MetricBatchDefinition[],
  aggregateByMetric: AggregateByMetric,
  monthLabels: Map<string, string>,
): void {
  const monthDate = row.Month ? parseMonthValue(row.Month) : null;
  const client = row.Client?.trim();

  if (!monthDate || !client) {
    return;
  }

  const monthKey = toMonthKey(monthDate);
  monthLabels.set(monthKey, toMonthLabel(monthDate));

  for (const metric of metrics) {
    const aggregate = aggregateByMetric.get(metric.id);
    if (!aggregate) {
      continue;
    }

    const bucket = getOrCreateBucket(aggregate, client, monthKey);
    const scoreRaw = row[metric.valueColumn]?.trim();
    const score = scoreRaw ? Number(scoreRaw) : Number.NaN;

    if (!Number.isNaN(score)) {
      bucket.sum += score;
      bucket.count += 1;
    }

    if (metric.commentsColumn) {
      const comment = row[metric.commentsColumn]?.trim();
      if (comment) {
        bucket.comments.push(comment);
      }
    }
  }
}

function buildMetricResults(
  metrics: MetricBatchDefinition[],
  aggregateByMetric: AggregateByMetric,
  monthLabels: Map<string, string>,
): Record<string, MetricTrendsData> {
  const result: Record<string, MetricTrendsData> = {};

  for (const metric of metrics) {
    const aggregate = aggregateByMetric.get(metric.id);
    if (!aggregate) {
      result[metric.id] = { clients: [] };
      continue;
    }

    const clients = [...aggregate.entries()]
      .map(([client, monthMap]) => {
        const points = [...monthMap.entries()]
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([monthKey, value]) => ({
            monthKey,
            monthLabel: monthLabels.get(monthKey) ?? monthKey,
            averageScore: value.count === 0 ? null : Number((value.sum / value.count).toFixed(2)),
            responseCount: value.count,
            comments: value.comments,
          }));

        return { client, points };
      })
      .sort((a, b) => a.client.localeCompare(b.client));

    result[metric.id] = { clients };
  }

  return result;
}

export async function getMetricTrendsBatch({
  metrics,
  csvPath,
}: {
  metrics: MetricBatchDefinition[];
  csvPath: string;
}): Promise<Record<string, MetricTrendsData>> {
  const csvText = await readFile(csvPath, "utf8");
  const rows = parseCsvRows(csvText);
  const aggregateByMetric = initializeAggregate(metrics);

  const monthLabels = new Map<string, string>();

  for (const row of rows) {
    accumulateRow(row, metrics, aggregateByMetric, monthLabels);
  }

  return buildMetricResults(metrics, aggregateByMetric, monthLabels);
}
