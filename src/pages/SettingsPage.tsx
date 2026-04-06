import { Bell, Bookmark, CreditCard, ShieldCheck } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { useSettingsStore } from "@/store/settingsStore";

const SettingsPage = () => {
  const { notifications, setNotifications, plan, favorites } = useSettingsStore();

  return (
    <PageTransition>
      <div className="space-y-6">
        <div><h1 className="section-title">Settings</h1><p className="section-copy">Manage alerts, workspace preferences, and plan details from one clean settings area.</p></div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
          <div className="space-y-6">
            <div className="app-card p-6"><div className="flex items-center gap-3"><div className="rounded-xl bg-indigo-50 p-3 text-primary"><Bell className="h-5 w-5" /></div><div><h2 className="text-lg font-bold text-slate-900">Notifications</h2><p className="mt-1 text-sm text-slate-500">Choose what updates the workspace should surface.</p></div></div><div className="mt-6 space-y-4">{[["breachAlerts", "Breach alerts"], ["weeklyReport", "Weekly reports"], ["productUpdates", "Product updates"], ["securityTips", "Security tips"]].map(([key, label]) => { const typedKey = key as keyof typeof notifications; return (<label key={key} className="flex items-center justify-between rounded-xl border border-slate-200 p-4"><div><div className="font-medium text-slate-900">{label}</div><div className="mt-1 text-sm text-slate-500">Receive {label.toLowerCase()} inside the workspace.</div></div><input type="checkbox" checked={notifications[typedKey]} onChange={(event) => setNotifications({ [typedKey]: event.target.checked })} className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary" /></label>); })}</div></div>
            <div className="app-card p-6"><div className="flex items-center gap-3"><div className="rounded-xl bg-sky-50 p-3 text-sky-600"><Bookmark className="h-5 w-5" /></div><div><h2 className="text-lg font-bold text-slate-900">Saved favorites</h2><p className="mt-1 text-sm text-slate-500">Quick access items stored in local workspace state.</p></div></div><div className="mt-5 space-y-3">{favorites.length === 0 ? <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">No favorites saved yet. Run tests and add preferred targets later.</div> : favorites.map((favorite) => (<div key={`${favorite.type}-${favorite.value}`} className="rounded-xl border border-slate-200 p-4 text-sm text-slate-700"><span className="font-semibold text-slate-900">{favorite.type}</span>: {favorite.value}</div>))}</div></div>
          </div>
          <div className="space-y-6">
            <div className="app-card p-6"><div className="flex items-center gap-3"><div className="rounded-xl bg-emerald-50 p-3 text-emerald-600"><ShieldCheck className="h-5 w-5" /></div><div><h2 className="text-lg font-bold text-slate-900">Workspace plan</h2><p className="mt-1 text-sm text-slate-500">Current access level and usage posture.</p></div></div><div className="mt-5 rounded-xl bg-slate-50 p-5"><div className="text-sm text-slate-500">Current plan</div><div className="mt-2 text-2xl font-bold text-slate-900">{plan === "pro" ? "Pro" : "Starter"}</div><div className="mt-2 text-sm text-slate-600">{plan === "pro" ? "Unlimited testing and richer visibility enabled." : "Upgrade to unlock more tests and better reporting."}</div></div></div>
            <div className="app-card p-6"><div className="flex items-center gap-3"><div className="rounded-xl bg-amber-50 p-3 text-amber-600"><CreditCard className="h-5 w-5" /></div><div><h2 className="text-lg font-bold text-slate-900">Billing guidance</h2><p className="mt-1 text-sm text-slate-500">Keep the commercial path easy to understand for operators.</p></div></div><div className="mt-5 space-y-3 text-sm leading-6 text-slate-600"><div className="rounded-xl bg-slate-50 p-4">Starter is best for trying the experience with one free test.</div><div className="rounded-xl bg-slate-50 p-4">Pro is designed for real usage with unlimited testing.</div><div className="rounded-xl bg-slate-50 p-4">Enterprise supports larger rollout and broader internal workflows.</div></div></div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SettingsPage;
