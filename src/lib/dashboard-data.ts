import path from "node:path";

import { securityMetricsConfig } from "@/config/metric-groups";
import { getMetricTrendsBatch } from "@/lib/metrics";
import type { MetricBatchDefinition, MetricGroup } from "@/types/metrics";

const CSV_PATH = path.join(process.cwd(), "data", "tech_assessments_data.csv");

function buildFallbackGroups(): MetricGroup[] {
  return [
    {
      id: "security",
      label: "Security",
      metrics: securityMetricsConfig.map((metric) => ({
        id: metric.id,
        label: metric.label,
        clients: [],
      })),
    },
  ];
}

async function loadSecurityGroup(): Promise<MetricGroup> {
  const batchDefinitions: MetricBatchDefinition[] = securityMetricsConfig.map((metric) => ({
    id: metric.id,
    valueColumn: metric.valueColumn,
    commentsColumn: metric.commentsColumn,
  }));

  const results = await getMetricTrendsBatch({ metrics: batchDefinitions, csvPath: CSV_PATH });

  return {
    id: "security",
    label: "Security",
    metrics: securityMetricsConfig.map((metric) => ({
      id: metric.id,
      label: metric.label,
      clients: results[metric.id]?.clients ?? [],
    })),
  };
}

export async function getDashboardData(): Promise<MetricGroup[]> {
  try {
    const securityGroup = await loadSecurityGroup();
    return [securityGroup];
  } catch (error) {
    console.error("Failed to load dashboard data:", error);
    return buildFallbackGroups();
  }
}
