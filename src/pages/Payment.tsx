import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { useSettingsStore } from "@/store/settingsStore";

const plans = [
  { name: "Starter", price: "$0", period: "/month", description: "For trying the workspace and running the initial free test.", features: ["1 free test", "Dashboard access", "Single workspace"], highlighted: false },
  { name: "Pro", price: "$29", period: "/month", description: "For teams that need unlimited tests and polished reporting.", features: ["Unlimited tests", "Expanded activity history", "Priority reporting view", "Improved team visibility"], highlighted: true },
  { name: "Enterprise", price: "$99", period: "/month", description: "For larger teams rolling this into broader operational workflows.", features: ["Unlimited users", "Custom retention", "Dedicated rollout support"], highlighted: false },
];

const Payment = () => {
  const { plan, upgradePlan } = useSettingsStore();

  return (
    <PageTransition>
      <div className="space-y-6">
        <div><h1 className="section-title">Payments</h1><p className="section-copy">Choose the plan that fits your team and unlock higher testing capacity when needed.</p></div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)]">
          <div className="grid gap-6 lg:grid-cols-3">{plans.map((planCard) => (<div key={planCard.name} className={`app-card hover-lift p-6 ${planCard.highlighted ? "ring-2 ring-primary/10" : ""}`}><div className="flex items-center justify-between"><div className="text-lg font-bold text-slate-900">{planCard.name}</div>{planCard.highlighted ? <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-primary">Recommended</div> : null}</div><div className="mt-5 flex items-end gap-1"><div className="text-4xl font-bold text-slate-900">{planCard.price}</div><div className="pb-1 text-sm text-slate-500">{planCard.period}</div></div><div className="mt-3 text-sm leading-6 text-slate-500">{planCard.description}</div><div className="mt-6 space-y-3">{planCard.features.map((feature) => (<div key={feature} className="flex items-start gap-3 text-sm text-slate-600"><Check className="mt-0.5 h-4 w-4 text-primary" /><span>{feature}</span></div>))}</div><button type="button" onClick={() => { if (planCard.name === "Pro") upgradePlan(); }} className={`mt-8 w-full rounded-xl px-4 py-3 text-sm font-semibold transition ${planCard.name === "Pro" ? "bg-primary text-white hover:bg-primary/95" : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>{plan === "pro" && planCard.name === "Pro" ? "Current Plan" : planCard.name === "Pro" ? "Choose Pro" : "Contact Sales"}</button></div>))}</div>
          <div className="space-y-6"><div className="app-card p-6"><h2 className="text-lg font-bold text-slate-900">Current billing status</h2><div className="mt-5 space-y-4"><div className="flex items-center justify-between text-sm"><span className="text-slate-500">Current plan</span><span className="font-semibold text-slate-900">{plan === "pro" ? "Pro" : "Starter"}</span></div><div className="flex items-center justify-between text-sm"><span className="text-slate-500">Access level</span><span className="font-semibold text-slate-900">{plan === "pro" ? "Unlimited tests" : "Single free test"}</span></div><div className="flex items-center justify-between text-sm"><span className="text-slate-500">Billing mode</span><span className={`font-semibold ${plan === "pro" ? "text-emerald-600" : "text-amber-600"}`}>{plan === "pro" ? "Active" : "Upgrade available"}</span></div></div></div><div className="app-card p-6"><h2 className="text-lg font-bold text-slate-900">Why teams upgrade</h2><div className="mt-4 space-y-3 text-sm leading-6 text-slate-600"><div className="rounded-xl bg-slate-50 p-4">Remove the free-test gate and keep the testing workflow available for day-to-day work.</div><div className="rounded-xl bg-slate-50 p-4">Give your dashboard and reports enough history to feel useful for real operations.</div><div className="rounded-xl bg-slate-50 p-4">Present a complete SaaS-style upgrade path inside the product experience.</div></div><Link to="/testing" className="mt-6 inline-flex rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">Back to Testing</Link></div></div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Payment;
