"use client";

import { useEffect, useMemo, useState } from "react";

import { MetricTrendExplorer } from "@/components/metric-trends/metric-trend-explorer";
import type { MetricGroup } from "@/types/metrics";

type SecurityMetricsExplorerProps = {
  groups: MetricGroup[];
};

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

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
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
        </div>
      </div>

      {selectedGroup.metrics.map((metric) => (
        <section key={metric.id} className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">{metric.label}</h2>
          <MetricTrendExplorer
            metricLabel={metric.label}
            clients={metric.clients}
            selectedClient={selectedClient}
            onClientChange={setSelectedClient}
            hideClientFilter
          />
        </section>
      ))}
    </div>
  );
}
