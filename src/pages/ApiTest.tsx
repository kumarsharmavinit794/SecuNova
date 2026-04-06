import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Copy, Loader2, Clock, CheckCircle, XCircle, Plus, Trash2, Star, StarOff } from "lucide-react";
import { useSettingsStore, type TestResult } from "@/store/settingsStore";
import { toast } from "sonner";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiResponse {
  status: number;
  statusText: string;
  time: number;
  size: string;
  headers: Record<string, string>;
  body: string;
}

const methodColors: Record<Method, string> = {
  GET: "text-safe bg-safe/10",
  POST: "text-warning bg-warning/10",
  PUT: "text-primary bg-primary/10",
  DELETE: "text-danger bg-danger/10",
  PATCH: "text-purple-400 bg-purple-400/10",
};

const mockApiCall = (url: string, method: Method, body?: string): Promise<ApiResponse> =>
  new Promise((resolve) => {
    const delay = 300 + Math.random() * 1500;
    setTimeout(() => {
      const mockBodies: Record<string, unknown> = {
        GET: { users: [{ id: 1, name: "John Doe", email: "john@example.com" }, { id: 2, name: "Jane Smith", email: "jane@example.com" }], total: 2, page: 1 },
        POST: { id: 3, message: "Resource created successfully", timestamp: new Date().toISOString() },
        PUT: { id: 1, message: "Resource updated", modified: new Date().toISOString() },
        DELETE: { message: "Resource deleted successfully", affected: 1 },
        PATCH: { id: 1, message: "Resource patched", fields: ["name"] },
      };
      resolve({
        status: method === "DELETE" ? 204 : url.includes("error") ? 500 : 200,
        statusText: method === "DELETE" ? "No Content" : url.includes("error") ? "Internal Server Error" : "OK",
        time: delay,
        size: `${(Math.random() * 5 + 0.5).toFixed(1)} KB`,
        headers: { "content-type": "application/json", "x-request-id": crypto.randomUUID().slice(0, 8), "cache-control": "no-cache", "x-ratelimit-remaining": String(Math.floor(Math.random() * 100)) },
        body: JSON.stringify(url.includes("error") ? { error: "Internal Server Error", message: "Something went wrong" } : mockBodies[method], null, 2),
      });
    }, delay);
  });

const ApiTest = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<Method>("GET");
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([{ key: "Content-Type", value: "application/json" }]);
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [activeTab, setActiveTab] = useState<"body" | "headers">("body");
  const { addTestResult, favorites, addFavorite, removeFavorite } = useSettingsStore();

  const isFav = favorites.some((f) => f.type === "api" && f.value === url);

  const handleSend = async () => {
    if (!url.trim()) { toast.error("Enter an API URL"); return; }
    setLoading(true);
    const start = Date.now();
    try {
      const res = await mockApiCall(url, method, body);
      setResponse(res);
      const testResult: TestResult = {
        id: crypto.randomUUID(),
        type: "api",
        target: `${method} ${url}`,
        status: res.status < 400 ? "success" : res.status < 500 ? "warning" : "error",
        timestamp: new Date().toISOString(),
        duration: Date.now() - start,
        summary: `${res.status} ${res.statusText} · ${Math.round(res.time)}ms · ${res.size}`,
        details: res,
      };
      addTestResult(testResult);
      toast.success(`${res.status} ${res.statusText}`);
    } catch {
      toast.error("Request failed");
    }
    setLoading(false);
  };

  const copyResponse = () => {
    if (response) { navigator.clipboard.writeText(response.body); toast.success("Copied!"); }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-2">
            <Send className="h-7 w-7 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">API Tester</h1>
          </div>
          <p className="text-muted-foreground mb-8">Send HTTP requests and inspect responses</p>
        </motion.div>

        {/* Request builder */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <select value={method} onChange={(e) => setMethod(e.target.value as Method)} className={`px-3 py-3 rounded-xl font-bold text-sm ${methodColors[method]} border-0 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer`}>
              {(["GET", "POST", "PUT", "DELETE", "PATCH"] as Method[]).map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/users" className="flex-1 px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono" />
            <div className="flex gap-2">
              {url && (
                <button type="button" onClick={() => isFav ? removeFavorite("api", url) : addFavorite("api", url)} className="px-3 py-3 rounded-xl bg-secondary hover:bg-accent transition-colors">
                  {isFav ? <Star className="h-4 w-4 text-warning fill-warning" /> : <StarOff className="h-4 w-4 text-muted-foreground" />}
                </button>
              )}
              <button onClick={handleSend} disabled={loading} className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm disabled:opacity-50 shrink-0">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send
              </button>
            </div>
          </div>

          {/* Headers */}
          <div className="space-y-2 mb-4">
            <p className="text-xs font-medium text-muted-foreground">Headers</p>
            {headers.map((h, i) => (
              <div key={i} className="flex gap-2">
                <input value={h.key} onChange={(e) => { const nh = [...headers]; nh[i].key = e.target.value; setHeaders(nh); }} placeholder="Key" className="flex-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary" />
                <input value={h.value} onChange={(e) => { const nh = [...headers]; nh[i].value = e.target.value; setHeaders(nh); }} placeholder="Value" className="flex-1 px-3 py-2 rounded-lg bg-secondary text-foreground text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary" />
                <button onClick={() => setHeaders(headers.filter((_, j) => j !== i))} className="p-2 rounded-lg hover:bg-secondary text-muted-foreground"><Trash2 className="h-3 w-3" /></button>
              </div>
            ))}
            <button onClick={() => setHeaders([...headers, { key: "", value: "" }])} className="flex items-center gap-1 text-xs text-primary hover:underline"><Plus className="h-3 w-3" /> Add Header</button>
          </div>

          {/* Body (for POST/PUT/PATCH) */}
          {["POST", "PUT", "PATCH"].includes(method) && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Body (JSON)</p>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder='{"key": "value"}' className="w-full px-3 py-2 rounded-lg bg-secondary text-foreground text-xs font-mono focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
            </div>
          )}
        </motion.div>

        {/* Response */}
        {response && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl overflow-hidden">
            {/* Status bar */}
            <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-b border-border/50">
              <span className={`flex items-center gap-1.5 text-sm font-bold ${response.status < 400 ? "text-safe" : "text-danger"}`}>
                {response.status < 400 ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {response.status} {response.statusText}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="h-3 w-3" /> {Math.round(response.time)}ms</span>
              <span className="text-xs text-muted-foreground">{response.size}</span>
              <button onClick={copyResponse} className="ml-auto flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg bg-secondary transition-colors"><Copy className="h-3 w-3" /> Copy</button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-5 pt-3">
              {(["body", "headers"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 rounded-t-lg text-xs font-medium capitalize ${activeTab === tab ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}>{tab}</button>
              ))}
            </div>

            <div className="p-5 pt-3">
              {activeTab === "body" ? (
                <pre className="text-xs font-mono text-foreground bg-secondary/50 rounded-lg p-4 overflow-x-auto max-h-80">{response.body}</pre>
              ) : (
                <div className="space-y-2">
                  {Object.entries(response.headers).map(([k, v]) => (
                    <div key={k} className="flex items-center gap-3 text-xs py-1.5 border-b border-border/30 last:border-0">
                      <span className="font-mono font-medium text-foreground">{k}</span>
                      <span className="text-muted-foreground font-mono ml-auto">{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ApiTest;
