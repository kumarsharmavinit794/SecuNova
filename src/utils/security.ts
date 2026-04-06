import type { TestResult } from "@/store/settingsStore";

export type ScanMode = "domain" | "api" | "frontend" | "security";

export interface ScanOutput {
  score: number;
  status: TestResult["status"];
  riskLevel: "Low" | "Medium" | "High";
  findings: string[];
  checks: { label: string; status: "passed" | "warning" }[];
}

const riskyPattern = /admin|staging|legacy|debug|test|sandbox|v1/i;

export const simulateScan = (target: string, mode: ScanMode): Promise<ScanOutput> =>
  new Promise((resolve) => {
    const risky = riskyPattern.test(target);

    window.setTimeout(() => {
      const findings = risky
        ? [
            "Authentication boundaries need review for this target.",
            "Header posture suggests additional hardening is recommended.",
            "Rate-limit and token rotation policies should be validated.",
          ]
        : [
            "Transport and access controls look aligned with baseline policy.",
            "No critical issues were flagged in the simulated scan.",
            "Target posture is stable for routine follow-up testing.",
          ];

      resolve({
        score: risky ? 68 : 94,
        status: risky ? "warning" : "success",
        riskLevel: risky ? "Medium" : "Low",
        findings,
        checks: [
          { label: "TLS and certificate validation", status: "passed" },
          { label: `${mode.toUpperCase()} endpoint exposure review`, status: risky ? "warning" : "passed" },
          { label: "Authentication and session policy", status: risky ? "warning" : "passed" },
        ],
      });
    }, 1800);
  });

export const buildActivitySeries = (history: TestResult[]) =>
  Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = date.toDateString();
    const scans = history.filter((item) => new Date(item.timestamp).toDateString() === key);
    const passed = scans.filter((item) => item.status === "success").length;
    const issues = scans.filter((item) => item.status !== "success").length;

    return {
      name: date.toLocaleDateString([], { weekday: "short" }),
      tests: scans.length,
      passed,
      issues,
    };
  });

export const buildTypeSeries = (history: TestResult[]) => {
  const labels = ["domain", "api", "frontend", "security"] as const;

  return labels.map((label) => ({
    name: label === "api" ? "API" : label[0].toUpperCase() + label.slice(1),
    value: history.filter((item) => item.type === label).length,
  }));
};

export const getSuccessRate = (history: TestResult[]) => {
  if (history.length === 0) {
    return 100;
  }

  const passed = history.filter((item) => item.status === "success").length;
  return Math.round((passed / history.length) * 100);
};
