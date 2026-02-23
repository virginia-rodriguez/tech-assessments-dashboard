export type MetricTrendPoint = {
  monthKey: string;
  monthLabel: string;
  averageScore: number | null;
  responseCount: number;
  comments: string[];
};

export type ClientMetricTrend = {
  client: string;
  points: MetricTrendPoint[];
};

export type MetricTrendsData = {
  clients: ClientMetricTrend[];
};

export type MetricBatchDefinition = {
  id: string;
  valueColumn: string;
  commentsColumn?: string;
};

export type MetricConfig = {
  label: string;
  valueColumn: string;
};

export type MetricGroupConfig = {
  id: string;
  label: string;
  metrics: MetricConfig[];
};

export type MetricGroup = {
  id: string;
  label: string;
  metrics: Array<{
    id: string;
    label: string;
    clients: ClientMetricTrend[];
  }>;
};
