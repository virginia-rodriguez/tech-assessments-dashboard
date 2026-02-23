import type { MetricGroupConfig } from "@/types/metrics";

export const metricGroupsConfig: MetricGroupConfig[] = [
  {
    id: "security",
    label: "Security",
    metrics: [
      { valueColumn: "Configuration from Environment" },
      { valueColumn: "No sensitive data stored in DB or appearing on logs" },
      { valueColumn: "Prevention of Web Vulnerabilities" },
      { valueColumn: "External Audits" },
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    metrics: [
      { valueColumn: "Well Defined Architecture" },
      { valueColumn: "Usage of Qubika Templates" },
      { valueColumn: "Usage of UI Components Library" },
    ],
  },
  {
    id: "performance",
    label: "Performance",
    metrics: [
      { valueColumn: "Performance Tests" },
      { valueColumn: "System Performance Monitoring" },
      { valueColumn: "Caching Strategy" },
      { valueColumn: "Database Performance" },
    ],
  },
  {
    id: "maintainability",
    label: "Maintainability",
    metrics: [
      { valueColumn: "Logging and Tracing" },
      { valueColumn: "Error Tracking, Monitoring, and Alerts" },
      { valueColumn: "Unit Tests" },
      { valueColumn: "E2E Tests" },
      { valueColumn: "Code Coverage" },
      { valueColumn: "Documentation" },
      { valueColumn: "Coding Standards" },
      { valueColumn: "Automated Env Setup" },
      { valueColumn: "Technical Debt Status" },
      { valueColumn: "Dependency Management" },
      { valueColumn: "Git Flow" },
      { valueColumn: "Code Reviews" },
      { valueColumn: "CI Configuration" },
      { valueColumn: "CD Configuration" },
    ],
  },
];
