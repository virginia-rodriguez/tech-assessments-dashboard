import type { MetricGroupConfig } from "@/types/metrics";

export const metricGroupsConfig: MetricGroupConfig[] = [
  {
    id: "security",
    label: "Security",
    metrics: [
      {
        label: "Configuration from Environment",
        valueColumn: "Configuration from Environment",
      },
      {
        label: "No sensitive data stored in DB or appearing on logs",
        valueColumn: "No sensitive data stored in DB or appearing on logs",
      },
      {
        label: "Prevention of Web Vulnerabilities",
        valueColumn: "Prevention of Web Vulnerabilities",
      },
      {
        label: "External Audits",
        valueColumn: "External Audits",
      },
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    metrics: [
      {
        label: "Well Defined Architecture",
        valueColumn: "Well Defined Architecture",
      },
      {
        label: "Usage of Qubika Templates",
        valueColumn: "Usage of Qubika Templates",
      },
      {
        label: "Usage of UI Components Library",
        valueColumn: "Usage of UI Components Library",
      },
    ],
  },
  {
    id: "performance",
    label: "Performance",
    metrics: [
      {
        label: "Performance Tests",
        valueColumn: "Performance Tests",
      },
      {
        label: "System Performance Monitoring",
        valueColumn: "System Performance Monitoring",
      },
      {
        label: "Caching Strategy",
        valueColumn: "Caching Strategy",
      },
      {
        label: "Database Performance",
        valueColumn: "Database Performance",
      },
    ],
  },
  {
    id: "maintainability",
    label: "Maintainability",
    metrics: [
      {
        label: "Logging and Tracing",
        valueColumn: "Logging and Tracing",
      },
      {
        label: "Error Tracking, Monitoring, and Alerts",
        valueColumn: "Error Tracking, Monitoring, and Alerts",
      },
      {
        label: "Unit Tests",
        valueColumn: "Unit Tests",
      },
      {
        label: "E2E Tests",
        valueColumn: "E2E Tests",
      },
      {
        label: "Code Coverage",
        valueColumn: "Code Coverage",
      },
      {
        label: "Documentation",
        valueColumn: "Documentation",
      },
      {
        label: "Coding Standards",
        valueColumn: "Coding Standards",
      },
      {
        label: "Automated Env Setup",
        valueColumn: "Automated Env Setup",
      },
      {
        label: "Technical Debt Status",
        valueColumn: "Technical Debt Status",
      },
      {
        label: "Dependency Management",
        valueColumn: "Dependency Management",
      },
      {
        label: "Git Flow",
        valueColumn: "Git Flow",
      },
      {
        label: "Code Reviews",
        valueColumn: "Code Reviews",
      },
      {
        label: "CI Configuration",
        valueColumn: "CI Configuration",
      },
      {
        label: "CD Configuration",
        valueColumn: "CD Configuration",
      },
    ],
  },
];
