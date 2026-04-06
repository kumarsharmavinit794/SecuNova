import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Loader2, CheckCircle, XCircle, AlertTriangle, Copy, Smartphone, Tablet, ScreenShare } from "lucide-react";
import { useSettingsStore, type TestResult } from "@/store/settingsStore";
import { toast } from "sonner";

interface FrontendResult {
  url: string;
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  mobileScore: number;
  seo: { title: boolean; metaDesc: boolean; h1: boolean; altTags: boolean; robots: boolean; sitemap: boolean; canonical: boolean; ogTags: boolean };
  performance: { score: number; grade: string };
  accessibility: { score: number; grade: string };
}

const mockFrontendTest = (url: string): Promise<FrontendResult> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const isGood = !url.includes("bad") && !url.includes("slow");
      resolve({
        url,
        loadTime: isGood ? 800 + Math.random() * 1200 : 2500 + Math.random() * 3000,
        firstContentfulPaint: isGood ? 400 + Math.random() * 600 : 1500 + Math.random() * 2000,
        largestContentfulPaint: isGood ? 1000 + Math.random() * 1500 : 3000 + Math.random() * 4000,
        mobileScore: isGood ? 70 + Math.random() * 30 : 30 + Math.random() * 40,
        seo: {
          title: Math.random() > 0.2,
          metaDesc: Math.random() > 0.3,
          h1: Math.random() > 0.15,
          altTags: Math.random() > 0.5,
          robots: Math.random() > 0.4,
          sitemap: Math.random() > 0.5,
          canonical: Math.random() > 0.3,
          ogTags: Math.random() > 0.4,
        },
        performance: { score: isGood ? 70 + Math.random() * 30 : 20 + Math.random() * 40, grade: isGood ? "A" : "D" },
        accessibility: { score: isGood ? 75 + Math.random() * 25 : 40 + Math.random() * 30, grade: isGood ? "B" : "D" },
      });
    }, 2000 + Math.random() * 2000);
  });

const ScoreRing = ({ score, size = 80, label }: { score: number; size?: number; label: string }) => {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const p = (score / 100) * c;
  const color = score >= 80 ? "hsl(142 71% 45%)" : score >= 50 ? "hsl(48 96% 53%)" : "hsl(0 84% 60%)";
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="hsl(var(--secondary))" strokeWidth="6" />
        <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - p }} transition={{ duration: 1.2, ease: "easeOut" }} />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-lg font-bold text-foreground">{Math.round(score)}</span>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
};

const FrontendTest = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FrontendResult | null>(null);
  const { addTestResult } = useSettingsStore();

  const handleTest = async () => {
    if (!url.trim()) { toast.error("Enter a URL"); return; }
    setLoading(true);
    const start = Date.now();
    try {
      const res = await mockFrontendTest(url);
      setResult(res);
      const seoCount = Object.values(res.seo).filter(Boolean).length;
      const testResult: TestResult = {
        id: crypto.randomUUID(),
        type: "frontend",
        target: url,
        status: res.performance.score >= 70 ? "success" : res.performance.score >= 40 ? "warning" : "error",
        timestamp: new Date().toISOString(),
        duration: Date.now() - start,
        summary: `Perf: ${Math.round(res.performance.score)} · Mobile: ${Math.round(res.mobileScore)} · SEO: ${seoCount}/8`,
        details: res,
      };
      addTestResult(testResult);
      toast.success("Frontend analysis complete!");
    } catch {
      toast.error("Test failed");
    }
    setLoading(false);
  };

  const SeoCheck = ({ label, ok }: { label: string; ok: boolean }) => (
    <div className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
      <span className="text-sm text-foreground">{label}</span>
      {ok ? <CheckCircle className="h-4 w-4 text-safe" /> : <XCircle className="h-4 w-4 text-danger" />}
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Monitor className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Frontend Tester</h1>
          </div>
          <p className="text-muted-foreground mb-8">Test page performance, mobile responsiveness, and SEO</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-4 mb-8">
          <form onSubmit={(e) => { e.preventDefault(); handleTest(); }} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Monitor className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono" />
            </div>
            <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm disabled:opacity-50 shrink-0">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScreenShare className="h-4 w-4" />}
              {loading ? "Testing..." : "Test Frontend"}
            </button>
          </form>
        </motion.div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Score rings */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { score: result.performance.score, label: "Performance" },
                { score: result.mobileScore, label: "Mobile" },
                { score: result.accessibility.score, label: "Accessibility" },
                { score: Object.values(result.seo).filter(Boolean).length / 8 * 100, label: "SEO" },
              ].map((s, i) => (
                <div key={i} className="glass rounded-xl p-4 flex flex-col items-center relative">
                  <ScoreRing score={s.score} label={s.label} />
                </div>
              ))}
            </div>

            {/* Timings */}
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-primary" /> Performance Metrics</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Page Load", value: `${Math.round(result.loadTime)}ms`, ok: result.loadTime < 2000 },
                  { label: "FCP", value: `${Math.round(result.firstContentfulPaint)}ms`, ok: result.firstContentfulPaint < 1000 },
                  { label: "LCP", value: `${Math.round(result.largestContentfulPaint)}ms`, ok: result.largestContentfulPaint < 2500 },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    {m.ok ? <CheckCircle className="h-5 w-5 text-safe shrink-0" /> : <AlertTriangle className="h-5 w-5 text-warning shrink-0" />}
                    <div>
                      <p className="text-xs text-muted-foreground">{m.label}</p>
                      <p className="text-sm font-bold text-foreground">{m.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsive preview */}
            <div className="glass rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2"><Smartphone className="h-4 w-4 text-primary" /> Responsiveness</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Smartphone, label: "Mobile", score: result.mobileScore },
                  { icon: Tablet, label: "Tablet", score: Math.min(100, result.mobileScore + 10) },
                  { icon: Monitor, label: "Desktop", score: Math.min(100, result.mobileScore + 20) },
                ].map((d, i) => (
                  <div key={i} className="text-center p-4 rounded-lg bg-secondary/50">
                    <d.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground mb-1">{d.label}</p>
                    <p className={`text-lg font-bold ${d.score >= 70 ? "text-safe" : d.score >= 50 ? "text-warning" : "text-danger"}`}>{Math.round(d.score)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SEO checklist */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">SEO Checklist</h3>
                <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(result.seo, null, 2)); toast.success("Copied!"); }} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg bg-secondary"><Copy className="h-3 w-3" /> Copy</button>
              </div>
              <SeoCheck label="Page Title" ok={result.seo.title} />
              <SeoCheck label="Meta Description" ok={result.seo.metaDesc} />
              <SeoCheck label="H1 Heading" ok={result.seo.h1} />
              <SeoCheck label="Image Alt Tags" ok={result.seo.altTags} />
              <SeoCheck label="Robots.txt" ok={result.seo.robots} />
              <SeoCheck label="Sitemap" ok={result.seo.sitemap} />
              <SeoCheck label="Canonical Tag" ok={result.seo.canonical} />
              <SeoCheck label="Open Graph Tags" ok={result.seo.ogTags} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FrontendTest;
