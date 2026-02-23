import type { MetricGroupConfig } from "@/types/metrics";

export const metricGroupsConfig: MetricGroupConfig[] = [
  {
    id: "security",
    label: "Security",
    metrics: [
      {
        id: "configuration_from_environment",
        label: "Configuration from Environment",
        valueColumn: "Configuration from Environment",
        commentsColumn: "Configuration from Environment Comments",
      },
      {
        id: "no_sensitive_data_stored",
        label: "No sensitive data stored in DB or appearing on logs",
        valueColumn: "No sensitive data stored in DB or appearing on logs",
        commentsColumn: "No sensitive data stored in DB or appearing on logs Comments",
      },
      {
        id: "prevention_of_web_vulnerabilities",
        label: "Prevention of Web Vulnerabilities",
        valueColumn: "Prevention of Web Vulnerabilities",
        commentsColumn: "Prevention of Web Vulnerabilities Comments",
      },
      {
        id: "external_audits",
        label: "External Audits",
        valueColumn: "External Audits",
        commentsColumn: "External Audits Comments",
      },
    ],
  },
  {
    id: "architecture",
    label: "Architecture",
    metrics: [
      {
        id: "well_defined_architecture",
        label: "Well Defined Architecture",
        valueColumn: "Well Defined Architecture",
        commentsColumn: "Well Defined Architecture Comments",
      },
      {
        id: "usage_of_qubika_templates",
        label: "Usage of Qubika Templates",
        valueColumn: "Usage of Qubika Templates",
        commentsColumn: "Usage of Qubika Templates Comments",
      },
      {
        id: "usage_of_ui_components_library",
        label: "Usage of UI Components Library",
        valueColumn: "Usage of UI Components Library",
        commentsColumn: "Usage of UI Components Library Comments",
      },
    ],
  },
  {
    id: "performance",
    label: "Performance",
    metrics: [
      {
        id: "performance_tests",
        label: "Performance Tests",
        valueColumn: "Performance Tests",
        commentsColumn: "Performance Tests Comments",
      },
      {
        id: "system_performance_monitoring",
        label: "System Performance Monitoring",
        valueColumn: "System Performance Monitoring",
        commentsColumn: "System Performance Monitoring Comments",
      },
      {
        id: "caching_strategy",
        label: "Caching Strategy",
        valueColumn: "Caching Strategy",
        commentsColumn: "Caching Strategy Comments",
      },
      {
        id: "database_performance",
        label: "Database Performance",
        valueColumn: "Database Performance",
        commentsColumn: "Database Performance Comments",
      },
    ],
  },
  {
    id: "maintainability",
    label: "Maintainability",
    metrics: [
      {
        id: "logging_and_tracing",
        label: "Logging and Tracing",
        valueColumn: "Logging and Tracing",
        commentsColumn: "Logging and Tracing Comments",
      },
      {
        id: "error_tracking_monitoring_and_alerts",
        label: "Error Tracking, Monitoring, and Alerts",
        valueColumn: "Error Tracking, Monitoring, and Alerts",
        commentsColumn: "Error Tracking, Monitoring, and Alerts Comments",
      },
      {
        id: "unit_tests",
        label: "Unit Tests",
        valueColumn: "Unit Tests",
        commentsColumn: "Unit Tests Comments",
      },
      {
        id: "e2e_tests",
        label: "E2E Tests",
        valueColumn: "E2E Tests",
        commentsColumn: "E2E Tests Comments",
      },
      {
        id: "code_coverage",
        label: "Code Coverage",
        valueColumn: "Code Coverage",
        commentsColumn: "Code Coverage Comments",
      },
      {
        id: "documentation",
        label: "Documentation",
        valueColumn: "Documentation",
        commentsColumn: "Documentation Comments",
      },
      {
        id: "coding_standards",
        label: "Coding Standards",
        valueColumn: "Coding Standards",
        commentsColumn: "Coding Standards Comments",
      },
      {
        id: "automated_env_setup",
        label: "Automated Env Setup",
        valueColumn: "Automated Env Setup",
        commentsColumn: "Automated Env Setup Comments",
      },
      {
        id: "technical_debt_status",
        label: "Technical Debt Status",
        valueColumn: "Technical Debt Status",
        commentsColumn: "Technical Debt Status Comments",
      },
      {
        id: "dependency_management",
        label: "Dependency Management",
        valueColumn: "Dependency Management",
        commentsColumn: "Dependency Management Comments",
      },
      {
        id: "git_flow",
        label: "Git Flow",
        valueColumn: "Git Flow",
        commentsColumn: "Git Flow Comments",
      },
      {
        id: "code_reviews",
        label: "Code Reviews",
        valueColumn: "Code Reviews",
        commentsColumn: "Code Reviews Comments",
      },
      {
        id: "ci_configuration",
        label: "CI Configuration",
        valueColumn: "CI Configuration",
        commentsColumn: "CI Configuration Comments",
      },
      {
        id: "cd_configuration",
        label: "CD Configuration",
        valueColumn: "CD Configuration",
        commentsColumn: "CD Configuration Comments",
      },
    ],
  },
];
