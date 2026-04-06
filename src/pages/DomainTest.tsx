import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, Shield, Clock, Lock, CheckCircle, XCircle, AlertTriangle, Loader2, Copy, Star, StarOff } from "lucide-react";
import { useSettingsStore, type TestResult } from "@/store/settingsStore";
import { toast } from "sonner";

interface DomainResult {
  domain: string;
  status: "active" | "inactive";
  ssl: { valid: boolean; issuer: string; expires: string };
  headers: { name: string; present: boolean; value?: string }[];
  loadTime: number;
  ip: string;
  server: string;
}

const mockDomainCheck = (domain: string): Promise<DomainResult> =>
  new Promise((resolve) => {
    const delay = 1500 + Math.random() * 2000;
    setTimeout(() => {
      const isSecure = !domain.includes("bad") && !domain.includes("test");
      resolve({
        domain,
        status: "active",
        ssl: {
          valid: isSecure,
          issuer: isSecure ? "Let's Encrypt Authority X3" : "Unknown",
          expires: "2026-12-15",
        },
        headers: [
          { name: "Strict-Transport-Security", present: isSecure, value: isSecure ? "max-age=31536000" : undefined },
          { name: "X-Content-Type-Options", present: isSecure, value: "nosniff" },
          { name: "X-Frame-Options", present: Math.random() > 0.3, value: "DENY" },
          { name: "Content-Security-Policy", present: Math.random() > 0.5, value: "default-src 'self'" },
          { name: "X-XSS-Protection", present: isSecure, value: "1; mode=block" },
          { name: "Referrer-Policy", present: Math.random() > 0.4, value: "strict-origin" },
        ],
        loadTime: 200 + Math.random() * 2800,
        ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        server: isSecure ? "nginx/1.24" : "Apache/2.4",
      });
    }, delay);
  });

const DomainTest = () => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DomainResult | null>(null);
  const { addTestResult, favorites, addFavorite, removeFavorite } = useSettingsStore();

  const isFav = favorites.some((f) => f.type === "domain" && f.value === domain);

  const handleTest = async () => {
    let cleanDomain = domain.trim();
    if (!cleanDomain) { toast.error("Enter a domain"); return; }
    cleanDomain = cleanDomain.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    setDomain(cleanDomain);
    setLoading(true);
    const start = Date.now();
    try {
      const res = await mockDomainCheck(cleanDomain);
      setResult(res);
      const headersOk = res.headers.filter((h) => h.present).length;
      const testResult: TestResult = {
        id: crypto.randomUUID(),
        type: "domain",
        target: cleanDomain,
        status: res.ssl.valid && headersOk >= 4 ? "success" : headersOk >= 2 ? "warning" : "error",
        timestamp: new Date().toISOString(),
        duration: Date.now() - start,
        summary: `SSL ${res.ssl.valid ? "Valid" : "Invalid"} · ${headersOk}/${res.headers.length} headers · ${Math.round(res.loadTime)}ms load`,
        details: res,
      };
      addTestResult(testResult);
      toast.success("Domain analysis complete!");
    } catch {
      toast.error("Analysis failed");
    }
    setLoading(false);
  };

  const copyResults = () => {
    if (!result) return;
    const text = `Domain Report: ${result.domain}\nStatus: ${result.status}\nSSL Valid: ${result.ssl.valid}\nLoad Time: ${Math.round(result.loadTime)}ms\nServer: ${result.server}\nIP: ${result.ip}\n\nSecurity Headers:\n${result.headers.map((h) => `${h.present ? "✓" : "✗"} ${h.name}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  const StatusBadge = ({ ok }: { ok: boolean }) => (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${ok ? "bg-safe/10 text-safe" : "bg-danger/10 text-danger"}`}>
      {ok ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
      {ok ? "Pass" : "Fail"}
    </span>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Domain Tester</h1>
          </div>
          <p className="text-muted-foreground mb-8">Analyze domain security, SSL status, and HTTP headers</p>
        </motion.div>

        {/* Input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-4 mb-8">
          <form onSubmit={(e) => { e.preventDefault(); handleTest(); }} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
              />
            </div>
            <div className="flex gap-2">
              {domain && (
                <button type="button" onClick={() => isFav ? removeFavorite("domain", domain) : addFavorite("domain", domain)} className="px-3 py-3 rounded-xl bg-secondary hover:bg-accent transition-colors">
                  {isFav ? <Star className="h-4 w-4 text-warning fill-warning" /> : <StarOff className="h-4 w-4 text-muted-foreground" />}
                </button>
              )}
              <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm disabled:opacity-50 shrink-0">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
                {loading ? "Analyzing..." : "Test Domain"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Results */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Overview row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Status", value: result.status, icon: CheckCircle, color: "text-safe" },
                { label: "SSL", value: result.ssl.valid ? "Valid" : "Invalid", icon: Lock, color: result.ssl.valid ? "text-safe" : "text-danger" },
                { label: "Load Time", value: `${Math.round(result.loadTime)}ms`, icon: Clock, color: result.loadTime < 1000 ? "text-safe" : result.loadTime < 2000 ? "text-warning" : "text-danger" },
                { label: "Server", value: result.server, icon: Globe, color: "text-primary" },
              ].map((item, i) => (
                <div key={i} className="glass rounded-xl p-4 text-center">
                  <item.icon className={`h-5 w-5 mx-auto mb-2 ${item.color}`} />
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className={`text-sm font-semibold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* SSL Details */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2"><Lock className="h-4 w-4 text-primary" /> SSL Certificate</h3>
                <StatusBadge ok={result.ssl.valid} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4 text-sm">
                <div><span className="text-muted-foreground">Issuer</span><p className="text-foreground font-medium">{result.ssl.issuer}</p></div>
                <div><span className="text-muted-foreground">Expires</span><p className="text-foreground font-medium">{result.ssl.expires}</p></div>
                <div><span className="text-muted-foreground">IP Address</span><p className="text-foreground font-medium font-mono">{result.ip}</p></div>
              </div>
            </div>

            {/* Security Headers */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Security Headers</h3>
                <button onClick={copyResults} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg bg-secondary transition-colors">
                  <Copy className="h-3 w-3" /> Copy
                </button>
              </div>
              <div className="space-y-3">
                {result.headers.map((h, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-foreground">{h.name}</p>
                      {h.value && h.present && <p className="text-xs text-muted-foreground font-mono">{h.value}</p>}
                      {!h.present && <p className="text-xs text-danger">Missing — recommended for security</p>}
                    </div>
                    <StatusBadge ok={h.present} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DomainTest;
