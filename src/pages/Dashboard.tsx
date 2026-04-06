import { Activity, AlertTriangle, CheckCircle2, ShieldAlert, TestTube2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import PageTransition from "@/components/PageTransition";
import { useSettingsStore } from "@/store/settingsStore";
import { formatDateTime } from "@/utils/format";
import { buildActivitySeries, buildTypeSeries, getSuccessRate } from "@/utils/security";

const Dashboard = () => {
  const { testHistory, plan } = useSettingsStore();

  const activitySeries = buildActivitySeries(testHistory);
  const typeSeries = buildTypeSeries(testHistory);
  const successRate = getSuccessRate(testHistory);
  const activeScans = testHistory.length === 0 ? 2 : Math.min(6, Math.max(1, Math.ceil(testHistory.length / 3)));
  const issuesFound = testHistory.filter((item) => item.status !== "success").length;

  const stats = [
    { title: "Total Tests", value: testHistory.length || 24, note: "Across all monitored targets", icon: TestTube2, tone: "bg-indigo-50 text-primary" },
    { title: "Active Scans", value: activeScans, note: "Currently in queued or live review", icon: Activity, tone: "bg-sky-50 text-sky-600" },
    { title: "Issues Found", value: issuesFound || 8, note: "Targets requiring follow-up", icon: AlertTriangle, tone: "bg-amber-50 text-amber-600" },
    { title: "Success Rate", value: `${successRate}%`, note: plan === "pro" ? "Unlimited plan active" : "Free plan monitoring", icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-600" },
  ];

  const tableRows = testHistory.length
    ? testHistory.slice(0, 6)
    : [
        { id: "seed-1", target: "portal.acme.io", type: "domain", status: "success", timestamp: new Date().toISOString(), summary: "Baseline checks completed" },
        { id: "seed-2", target: "api.acme.io/v1", type: "api", status: "warning", timestamp: new Date().toISOString(), summary: "Auth review recommended" },
        { id: "seed-3", target: "dashboard.partner.io", type: "frontend", status: "success", timestamp: new Date().toISOString(), summary: "Headers and routes stable" },
      ];

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="section-title">Dashboard</h1>
          <p className="section-copy">Track testing operations, issue volume, and recent platform activity from one structured admin view.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((card) => (
            <div key={card.title} className="app-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-500">{card.title}</div>
                  <div className="mt-3 text-3xl font-bold text-slate-900">{card.value}</div>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.tone}`}><card.icon className="h-5 w-5" /></div>
              </div>
              <div className="mt-4 text-sm text-slate-500">{card.note}</div>
            </div>
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,1fr)]">
          <div className="app-card p-6">
            <div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-900">Testing activity</h2><p className="mt-1 text-sm text-slate-500">Weekly run volume and passed checks</p></div><div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-primary">Last 7 days</div></div>
            <div className="mt-6 h-[300px]"><ResponsiveContainer width="100%" height="100%"><LineChart data={activitySeries}><CartesianGrid stroke="#E2E8F0" vertical={false} /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} /><Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #E2E8F0", boxShadow: "0 16px 40px rgba(15,23,42,0.08)" }} /><Line type="monotone" dataKey="tests" stroke="#4F46E5" strokeWidth={3} dot={{ r: 4 }} /><Line type="monotone" dataKey="passed" stroke="#0EA5E9" strokeWidth={2.5} dot={{ r: 3 }} /></LineChart></ResponsiveContainer></div>
          </div>
          <div className="app-card p-6">
            <div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-900">Test categories</h2><p className="mt-1 text-sm text-slate-500">Distribution by target type</p></div><ShieldAlert className="h-5 w-5 text-slate-400" /></div>
            <div className="mt-6 h-[300px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={typeSeries}><CartesianGrid stroke="#E2E8F0" vertical={false} /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} /><Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #E2E8F0", boxShadow: "0 16px 40px rgba(15,23,42,0.08)" }} /><Bar dataKey="value" fill="#4F46E5" radius={[10, 10, 0, 0]} barSize={38} /></BarChart></ResponsiveContainer></div>
          </div>
        </div>
        <div className="app-card overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5"><div><h2 className="text-lg font-bold text-slate-900">Recent activity</h2><p className="mt-1 text-sm text-slate-500">Latest test runs and operational summaries</p></div></div>
          <div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="px-6 py-4 font-medium">Target</th><th className="px-6 py-4 font-medium">Type</th><th className="px-6 py-4 font-medium">Status</th><th className="px-6 py-4 font-medium">Summary</th><th className="px-6 py-4 font-medium">Updated</th></tr></thead><tbody>{tableRows.map((row) => (<tr key={row.id} className="border-t border-slate-200 transition hover:bg-slate-50/80"><td className="px-6 py-4 font-semibold text-slate-900">{row.target}</td><td className="px-6 py-4 capitalize text-slate-600">{row.type}</td><td className="px-6 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${row.status === "success" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{row.status === "success" ? "Healthy" : "Needs review"}</span></td><td className="px-6 py-4 text-slate-600">{row.summary}</td><td className="px-6 py-4 text-slate-500">{formatDateTime(row.timestamp)}</td></tr>))}</tbody></table></div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
