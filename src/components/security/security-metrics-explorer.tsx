"use client";

import { useEffect, useMemo, useState } from "react";

import { MetricTrendExplorer } from "@/components/metric-trends/metric-trend-explorer";
import type { MetricGroup } from "@/types/metrics";

type SecurityMetricsExplorerProps = {
  groups: MetricGroup[];
};

function formatLatestValue(score: number | null | undefined): string {
  if (score === null || score === undefined) {
    return "N/A";
  }

  return Number.isInteger(score) ? String(score) : score.toFixed(2);
}

function latestBadgeColorClass(score: number | null | undefined): string {
  if (score === null || score === undefined) {
    return "border-slate-200 bg-slate-100 text-slate-700";
  }

  const scoreBucket = Math.max(1, Math.min(5, Math.round(score)));
  switch (scoreBucket) {
    case 1:
      return "border-rose-200 bg-rose-100 text-rose-800";
    case 2:
      return "border-amber-200 bg-amber-100 text-amber-800";
    case 3:
      return "border-slate-200 bg-slate-100 text-slate-700";
    case 4:
      return "border-sky-200 bg-sky-100 text-sky-800";
    default:
      return "border-teal-200 bg-teal-100 text-teal-800";
  }
}

export function SecurityMetricsExplorer({ groups }: SecurityMetricsExplorerProps) {
  const [selectedGroupId, setSelectedGroupId] = useState(groups[0]?.id ?? "");

  const selectedGroup = useMemo(
    () => groups.find((group) => group.id === selectedGroupId) ?? groups[0],
    [groups, selectedGroupId],
  );
  const availableClients = useMemo(() => {
    if (!selectedGroup) {
      return [];
    }

    const uniqueClients = new Set<string>();
    for (const metric of selectedGroup.metrics) {
      for (const client of metric.clients) {
        uniqueClients.add(client.client);
      }
    }

    return [...uniqueClients].sort((a, b) => a.localeCompare(b));
  }, [selectedGroup]);
  const [selectedClient, setSelectedClient] = useState("");

  useEffect(() => {
    if (availableClients.length === 0) {
      return;
    }

    if (!availableClients.includes(selectedClient)) {
      setSelectedClient(availableClients[0]);
    }
  }, [availableClients, selectedClient]);

  if (!selectedGroup) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
        No grouped metric data found in CSV.
      </div>
    );
  }

  const latestByMetricId = new Map(
    selectedGroup.metrics.map((metric) => {
      const clientData = metric.clients.find((client) => client.client === selectedClient);
      const latestPoint = clientData?.points.at(-1);
      return [
        metric.id,
        {
          score: latestPoint?.averageScore ?? null,
          value: formatLatestValue(latestPoint?.averageScore),
          badgeClass: latestBadgeColorClass(latestPoint?.averageScore),
        },
      ] as const;
    }),
  );
  const latestScores = [...latestByMetricId.values()]
    .map((latest) => latest.score)
    .filter((score): score is number => score !== null && Number.isFinite(score));
  const categoryAverageScore =
    latestScores.length > 0
      ? latestScores.reduce((sum, score) => sum + score, 0) / latestScores.length
      : null;
  const categoryAverageValue = formatLatestValue(categoryAverageScore);
  const categoryAverageBadgeClass = latestBadgeColorClass(categoryAverageScore);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Client</span>
            <select
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              value={selectedClient}
              onChange={(event) => setSelectedClient(event.target.value)}
            >
              {availableClients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Assessment Group</span>
            <select
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
              value={selectedGroup.id}
              onChange={(event) => setSelectedGroupId(event.target.value)}
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-900">{selectedGroup.label}</h2>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Category Avg
            </span>
            <span
              className={`inline-flex min-w-14 items-center justify-center rounded-full border px-3 py-1 text-base font-bold tabular-nums ${categoryAverageBadgeClass}`}
            >
              {categoryAverageValue}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {selectedGroup.metrics.map((metric) => {
          const latest = latestByMetricId.get(metric.id);

          return (
            <section key={metric.id} className="min-w-0 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xl font-semibold text-slate-900">{metric.label}</h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Latest
                  </span>
                  <span
                    className={`inline-flex min-w-14 items-center justify-center rounded-full border px-3 py-1 text-base font-bold tabular-nums ${latest?.badgeClass ?? "border-slate-200 bg-slate-100 text-slate-700"}`}
                  >
                    {latest?.value ?? "N/A"}
                  </span>
                </div>
              </div>
              <MetricTrendExplorer
                metricLabel={metric.label}
                clients={metric.clients}
                selectedClient={selectedClient}
                onClientChange={setSelectedClient}
                hideClientFilter
              />
            </section>
          );
        })}
      </div>
    </div>
  );
}
