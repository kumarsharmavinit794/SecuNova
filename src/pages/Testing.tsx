import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, ShieldAlert, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { useSettingsStore, type TestResult } from "@/store/settingsStore";
import { formatDateTime, formatDuration } from "@/utils/format";
import { simulateScan, type ScanMode, type ScanOutput } from "@/utils/security";

const scanModes: { value: ScanMode; label: string }[] = [
  { value: "domain", label: "Domain" },
  { value: "api", label: "API" },
  { value: "frontend", label: "Frontend" },
  { value: "security", label: "Security" },
];

const Testing = () => {
  const navigate = useNavigate();
  const { addTestResult, hasFreeScanRemaining, getRemainingFreeScans, plan, testHistory } = useSettingsStore();
  const [mode, setMode] = useState<ScanMode>("domain");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanOutput | null>(null);
  const [lastRunAt, setLastRunAt] = useState<string | null>(null);

  const remainingScans = getRemainingFreeScans();
  const historyPreview = testHistory.slice(0, 3);

  const helperText = useMemo(() => {
    if (plan === "pro") return "Pro plan active. Unlimited test execution is available.";
    return `${remainingScans} free ${remainingScans === 1 ? "test" : "tests"} remaining before upgrade.`;
  }, [plan, remainingScans]);

  const handleRun = async () => {
    if (!target.trim()) return;
    if (!hasFreeScanRemaining()) {
      navigate("/payment");
      return;
    }
    setLoading(true);
    setResult(null);
    const scanResult = await simulateScan(target, mode);
    const timestamp = new Date().toISOString();
    const historyRecord: TestResult = {
      id: crypto.randomUUID(),
      type: mode,
      target,
      status: scanResult.status,
      timestamp,
      duration: 1800,
      summary: `${scanResult.riskLevel} risk score ${scanResult.score}`,
      details: scanResult,
    };
    addTestResult(historyRecord);
    setResult(scanResult);
    setLastRunAt(timestamp);
    setLoading(false);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        <div><h1 className="section-title">Testing</h1><p className="section-copy">Run checks against domains, APIs, and related targets from a simple structured workflow.</p></div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
          <div className="app-card p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-lg font-bold text-slate-900">Run a new test</h2><p className="mt-1 text-sm text-slate-500">Choose a target type, enter a domain or endpoint, and review the result.</p></div><div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{helperText}</div></div>
            <div className="mt-6 flex flex-wrap gap-2">{scanModes.map((item) => (<button key={item.value} type="button" onClick={() => setMode(item.value)} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${mode === item.value ? "bg-primary text-white" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"}`}>{item.label}</button>))}</div>
            <div className="mt-6 grid gap-4">
              <div><label className="mb-2 block text-sm font-medium text-slate-700">Target</label><input value={target} onChange={(event) => setTarget(event.target.value)} placeholder={mode === "api" ? "api.company.com/v1" : "portal.company.com"} className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" /></div>
              <button type="button" onClick={handleRun} disabled={loading || !target.trim()} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-70">{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}{loading ? "Running test..." : "Run Test"}</button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">{[{ label: "Plan", value: plan === "pro" ? "Pro" : "Free" }, { label: "Mode", value: mode.toUpperCase() }, { label: "Last run", value: lastRunAt ? formatDateTime(lastRunAt) : "Not yet" }].map((item) => (<div key={item.label} className="rounded-xl bg-slate-50 p-4"><div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{item.label}</div><div className="mt-2 text-sm font-semibold text-slate-900">{item.value}</div></div>))}</div>
          </div>
          <div className="space-y-6">
            <div className="app-card p-6"><h2 className="text-lg font-bold text-slate-900">Result</h2>{!result ? <div className="mt-4 rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-500">Run a test to generate posture score, review notes, and checklist outcomes.</div> : <div className="mt-5 space-y-4"><div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${result.status === "success" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{result.status === "success" ? <CheckCircle2 className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}{result.status === "success" ? "Healthy result" : "Follow-up recommended"}</div><div className="text-4xl font-bold text-slate-900">{result.score}</div><div className="text-sm text-slate-500">Risk level: {result.riskLevel}</div><div className="space-y-3">{result.findings.map((finding) => (<div key={finding} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">{finding}</div>))}</div></div>}</div>
            <div className="app-card p-6"><h2 className="text-lg font-bold text-slate-900">Recent checks</h2><div className="mt-4 space-y-3">{(result?.checks ?? [{ label: "TLS and certificate validation", status: "passed" }, { label: "Authentication and session policy", status: "passed" }, { label: "Exposure review", status: "warning" }]).map((check) => (<div key={check.label} className="flex items-center justify-between rounded-xl border border-slate-200 p-4"><div className="text-sm font-medium text-slate-700">{check.label}</div><div className={`inline-flex items-center gap-2 text-sm font-semibold ${check.status === "passed" ? "text-emerald-600" : "text-amber-600"}`}>{check.status === "passed" ? <ShieldCheck className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}{check.status === "passed" ? "Passed" : "Warning"}</div></div>))}</div></div>
          </div>
        </div>
        <div className="app-card p-6"><h2 className="text-lg font-bold text-slate-900">Latest history</h2><div className="mt-4 grid gap-4 md:grid-cols-3">{(historyPreview.length ? historyPreview : [{ id: "preview-1", target: "api.acme.io/v1", summary: "Low risk score 91", timestamp: new Date().toISOString(), duration: 1800 }, { id: "preview-2", target: "portal.acme.io", summary: "Medium risk score 68", timestamp: new Date().toISOString(), duration: 1800 }, { id: "preview-3", target: "auth.acme.io", summary: "Low risk score 94", timestamp: new Date().toISOString(), duration: 1800 }]).map((item) => (<div key={item.id} className="rounded-xl border border-slate-200 p-4"><div className="text-sm font-semibold text-slate-900">{item.target}</div><div className="mt-2 text-sm text-slate-500">{item.summary}</div><div className="mt-4 flex items-center justify-between text-xs text-slate-400"><span>{formatDateTime(item.timestamp)}</span><span>{formatDuration(item.duration)}</span></div></div>))}</div></div>
      </div>
    </PageTransition>
  );
};

export default Testing;
