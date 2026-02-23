import path from "node:path";

import { metricGroupsConfig } from "@/config/metric-groups";
import { getMetricTrendsBatch } from "@/lib/metrics";
import type { MetricBatchDefinition, MetricGroup } from "@/types/metrics";

const CSV_PATH = path.join(process.cwd(), "data", "tech_assessments_data.csv");

function buildFallbackGroups(): MetricGroup[] {
  return metricGroupsConfig.map((group) => ({
    id: group.id,
    label: group.label,
    metrics: group.metrics.map((metric) => ({
      id: metric.id,
      label: metric.label,
      clients: [],
    })),
  }));
}

function buildBatchDefinitions(): MetricBatchDefinition[] {
  return metricGroupsConfig.flatMap((group) =>
    group.metrics.map((metric) => ({
      id: metric.id,
      valueColumn: metric.valueColumn,
      commentsColumn: metric.commentsColumn,
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
        id: metric.id,
        label: metric.label,
      clients: results[metric.id]?.clients ?? [],
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
