"use client";

import { useEffect, useMemo, useState } from "react";

import { MetricCommentsPanel } from "@/components/metric-trends/metric-comments-panel";
import { MetricTrendChart } from "@/components/metric-trends/metric-trend-chart";
import { MetricTrendFilters } from "@/components/metric-trends/metric-trend-filters";
import type { ClientMetricTrend } from "@/types/metrics";

type MetricTrendExplorerProps = {
  metricLabel: string;
  clients: ClientMetricTrend[];
  selectedClient?: string;
  onClientChange?: (client: string) => void;
  hideClientFilter?: boolean;
};

export function MetricTrendExplorer({
  metricLabel,
  clients,
  selectedClient,
  onClientChange,
  hideClientFilter = false,
}: MetricTrendExplorerProps) {
  const [internalSelectedClient, setInternalSelectedClient] = useState(clients[0]?.client ?? "");
  const effectiveSelectedClient = selectedClient ?? internalSelectedClient;
  const setEffectiveSelectedClient = onClientChange ?? setInternalSelectedClient;

  useEffect(() => {
    if (clients.length === 0) {
      return;
    }

    const hasSelectedClient = clients.some((clientData) => clientData.client === effectiveSelectedClient);
    if (!hasSelectedClient) {
      setEffectiveSelectedClient(clients[0].client);
    }
  }, [clients, effectiveSelectedClient, setEffectiveSelectedClient]);

  const selectedClientData = useMemo(
    () => clients.find((clientData) => clientData.client === effectiveSelectedClient),
    [clients, effectiveSelectedClient],
  );

  const points = useMemo(() => selectedClientData?.points ?? [], [selectedClientData]);

  const [selectedMonthKey, setSelectedMonthKey] = useState(points.at(-1)?.monthKey ?? "");

  useEffect(() => {
    setSelectedMonthKey(points.at(-1)?.monthKey ?? "");
  }, [selectedClient, points]);

  const selectedMonthData = points.find((point) => point.monthKey === selectedMonthKey);

  if (clients.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600 shadow-sm">
        No client data found in CSV.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!hideClientFilter ? (
        <MetricTrendFilters
          clients={clients.map((clientData) => ({ label: clientData.client, value: clientData.client }))}
          selectedClient={effectiveSelectedClient}
          onClientChange={setEffectiveSelectedClient}
        />
      ) : null}

      <MetricTrendChart
        metricLabel={metricLabel}
        points={points.map((point) => ({
          monthKey: point.monthKey,
          monthLabel: point.monthLabel,
          averageScore: point.averageScore,
        }))}
        onSelectMonth={setSelectedMonthKey}
      />

      <MetricCommentsPanel
        monthLabel={selectedMonthData?.monthLabel}
        responseCount={selectedMonthData?.responseCount}
        comments={selectedMonthData?.comments ?? []}
      />
    </div>
  );
}
