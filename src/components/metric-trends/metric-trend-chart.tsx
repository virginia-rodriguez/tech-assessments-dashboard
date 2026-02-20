"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

type TrendPoint = {
  monthKey: string;
  monthLabel: string;
  averageScore: number | null;
};

type MetricTrendChartProps = {
  metricLabel: string;
  points: TrendPoint[];
  onSelectMonth: (monthKey: string) => void;
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function MetricTrendChart({ metricLabel, points, onSelectMonth }: MetricTrendChartProps) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${metricLabel} Trend`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 5,
        title: {
          display: true,
          text: "Average Score",
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
        ticks: {
          maxRotation: 45,
          minRotation: 30,
        },
      },
    },
    onClick: (_event: unknown, elements: Array<{ index: number }>) => {
      const selectedIndex = elements[0]?.index;
      if (selectedIndex === undefined) {
        return;
      }

      const selectedPoint = points[selectedIndex];
      if (!selectedPoint) {
        return;
      }

      onSelectMonth(selectedPoint.monthKey);
    },
  } satisfies ChartOptions<"line">;

  const chartData = {
    labels: points.map((point) => point.monthLabel),
    datasets: [
      {
        label: "Average score",
        data: points.map((point) => point.averageScore),
        borderColor: "rgb(37, 99, 235)",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.25,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  } satisfies ChartData<"line">;

  return (
    <div className="h-[420px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <Line options={chartOptions} data={chartData} />
    </div>
  );
}
