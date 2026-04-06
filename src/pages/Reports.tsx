import { FileText, ShieldCheck, TrendingUp } from "lucide-react";
import { ResponsiveContainer, Tooltip, AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts";
import PageTransition from "@/components/PageTransition";
import { useSettingsStore } from "@/store/settingsStore";
import { formatDateTime } from "@/utils/format";
import { buildActivitySeries, getSuccessRate } from "@/utils/security";

const Reports = () => {
  const { testHistory, activityLogs } = useSettingsStore();
  const activitySeries = buildActivitySeries(testHistory);
  const successRate = getSuccessRate(testHistory);

  return (
    <PageTransition>
      <div className="space-y-6">
        <div><h1 className="section-title">Reports</h1><p className="section-copy">Review trend summaries, test outcomes, and recent operational events in a clean reporting view.</p></div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="app-card p-5"><div className="flex items-center gap-3"><div className="rounded-xl bg-indigo-50 p-3 text-primary"><FileText className="h-5 w-5" /></div><div><div className="text-sm text-slate-500">Generated reports</div><div className="text-2xl font-bold text-slate-900">12</div></div></div></div>
          <div className="app-card p-5"><div className="flex items-center gap-3"><div className="rounded-xl bg-emerald-50 p-3 text-emerald-600"><ShieldCheck className="h-5 w-5" /></div><div><div className="text-sm text-slate-500">Success rate</div><div className="text-2xl font-bold text-slate-900">{successRate}%</div></div></div></div>
          <div className="app-card p-5"><div className="flex items-center gap-3"><div className="rounded-xl bg-sky-50 p-3 text-sky-600"><TrendingUp className="h-5 w-5" /></div><div><div className="text-sm text-slate-500">Recent activity</div><div className="text-2xl font-bold text-slate-900">{activityLogs.length}</div></div></div></div>
        </div>
        <div className="app-card p-6">
          <div><h2 className="text-lg font-bold text-slate-900">Performance trend</h2><p className="mt-1 text-sm text-slate-500">Weekly completed tests and issue count</p></div>
          <div className="mt-6 h-[320px]"><ResponsiveContainer width="100%" height="100%"><AreaChart data={activitySeries}><defs><linearGradient id="testsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4F46E5" stopOpacity={0.28} /><stop offset="95%" stopColor="#4F46E5" stopOpacity={0.04} /></linearGradient><linearGradient id="issuesFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.22} /><stop offset="95%" stopColor="#0EA5E9" stopOpacity={0.03} /></linearGradient></defs><CartesianGrid stroke="#E2E8F0" vertical={false} /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} /><Tooltip contentStyle={{ borderRadius: 16, border: "1px solid #E2E8F0" }} /><Area type="monotone" dataKey="tests" stroke="#4F46E5" fill="url(#testsFill)" strokeWidth={3} /><Area type="monotone" dataKey="issues" stroke="#0EA5E9" fill="url(#issuesFill)" strokeWidth={2.5} /></AreaChart></ResponsiveContainer></div>
        </div>
        <div className="app-card overflow-hidden"><div className="border-b border-slate-200 px-6 py-5"><h2 className="text-lg font-bold text-slate-900">Activity log</h2><p className="mt-1 text-sm text-slate-500">System updates and completed test events</p></div><div className="divide-y divide-slate-200">{activityLogs.length === 0 ? <div className="px-6 py-8 text-sm text-slate-500">No report events yet. Run a test to generate history.</div> : activityLogs.map((log) => (<div key={log.id} className="flex flex-col gap-2 px-6 py-4 md:flex-row md:items-center md:justify-between"><div><div className="font-medium text-slate-900">{log.message}</div><div className="mt-1 text-sm text-slate-500">{log.level.toUpperCase()} event</div></div><div className="text-sm text-slate-500">{formatDateTime(log.timestamp)}</div></div>))}</div></div>
      </div>
    </PageTransition>
  );
};

export default Reports;
