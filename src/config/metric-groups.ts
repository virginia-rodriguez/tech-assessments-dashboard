export const securityMetricsConfig = [
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
] as const;
