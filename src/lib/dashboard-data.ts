import path from "node:path";

import { metricGroupsConfig } from "@/config/metric-groups";
import { getMetricTrendsBatch } from "@/lib/metrics";
import type { MetricBatchDefinition, MetricGroup } from "@/types/metrics";

const CSV_PATH = path.join(process.cwd(), "data", "tech_assessments_data.csv");

function metricIdFromValueColumn(valueColumn: string): string {
  return valueColumn
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function metricLabelFromConfig(metric: { label?: string; valueColumn: string }): string {
  return metric.label?.trim() || metric.valueColumn;
}

function buildFallbackGroups(): MetricGroup[] {
  return metricGroupsConfig.map((group) => ({
    id: group.id,
    label: group.label,
    metrics: group.metrics.map((metric) => ({
      id: metricIdFromValueColumn(metric.valueColumn),
      label: metricLabelFromConfig(metric),
      clients: [],
    })),
  }));
}

function buildBatchDefinitions(): MetricBatchDefinition[] {
  return metricGroupsConfig.flatMap((group) =>
    group.metrics.map((metric) => ({
      id: metricIdFromValueColumn(metric.valueColumn),
      valueColumn: metric.valueColumn,
      commentsColumn: `${metric.valueColumn} Comments`,
    })),
  );
}

function buildGroupsFromResults(
  results: Awaited<ReturnType<typeof getMetricTrendsBatch>>,
): MetricGroup[] {
  return metricGroupsConfig.map((group) => ({
    id: group.id,
    label: group.label,
    metrics: group.metrics.map((metric) => ({
      id: metricIdFromValueColumn(metric.valueColumn),
      label: metricLabelFromConfig(metric),
      clients: results[metricIdFromValueColumn(metric.valueColumn)]?.clients ?? [],
    })),
  }));
}

export async function getDashboardData(): Promise<MetricGroup[]> {
  try {
    const results = await getMetricTrendsBatch({
      metrics: buildBatchDefinitions(),
      csvPath: CSV_PATH,
    });

    return buildGroupsFromResults(results);
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    return buildFallbackGroups();
  }
}
