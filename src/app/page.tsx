import path from "node:path";

import { SecurityMetricsExplorer } from "@/components/security/security-metrics-explorer";
import { securityMetricsConfig } from "@/config/metric-groups";
import { getMetricTrendsBatch } from "@/lib/metrics";
import type { MetricBatchDefinition, MetricGroup } from "@/types/metrics";

export const dynamic = "force-dynamic";

export default async function Home() {
  const csvPath = path.join(process.cwd(), "data", "tech_assessments_data.csv");
  const fallbackGroups: MetricGroup[] = [
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

  let groups: MetricGroup[] = fallbackGroups;

  try {
    const batchDefinitions: MetricBatchDefinition[] = securityMetricsConfig.map((metric) => ({
      id: metric.id,
      valueColumn: metric.valueColumn,
      commentsColumn: metric.commentsColumn,
    }));
    const results = await getMetricTrendsBatch({ metrics: batchDefinitions, csvPath });

    groups = [
      {
        id: "security",
        label: "Security",
        metrics: securityMetricsConfig.map((metric) => ({
          id: metric.id,
          label: metric.label,
          clients: results[metric.id]?.clients ?? [],
        })),
      },
    ];
  } catch (error) {
    console.error("Failed to read CSV data:", error);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-sky-50 p-8 md:p-12">
      <section className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Technical Assessments Data Explorer
          </h1>
          <p className="text-slate-600">
            Choose a group, then inspect all metrics inside it across clients and months.
          </p>
        </header>

        <SecurityMetricsExplorer groups={groups} />
      </section>
    </main>
  );
}
