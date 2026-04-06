import { motion } from "framer-motion";
import { Activity, ArrowUpRight, Bot, ShieldCheck, Sparkles } from "lucide-react";

const previewCards = [
  { label: "Threat Index", value: "Low", tone: "text-accent", icon: ShieldCheck },
  { label: "API Health", value: "98%", tone: "text-primary", icon: Activity },
  { label: "MTTR", value: "12m", tone: "text-safe", icon: ArrowUpRight },
];

const DashboardPreview = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="relative mx-auto w-full max-w-xl"
  >
    <div className="absolute -inset-8 rounded-[2rem] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.28),transparent_44%),radial-gradient(circle_at_bottom,rgba(14,165,233,0.16),transparent_40%)] blur-3xl" />
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.82),rgba(15,23,42,0.72))] p-5 shadow-[0_24px_80px_rgba(4,9,24,0.46)] backdrop-blur-xl">
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Live Preview</p>
          <h3 className="mt-2 text-xl font-semibold text-white">ShieldTest Command Center</h3>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs text-indigo-100">
          <Bot className="h-3.5 w-3.5" />
          AI Defender
        </div>
      </div>

      <div className="relative mt-5 grid gap-4 md:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-300">Realtime scan orchestration</p>
              <span className="text-xs text-primary">live</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,#6366F1,#0EA5E9)]"
                initial={{ width: "12%" }}
                animate={{ width: ["24%", "78%", "56%"] }}
                transition={{ duration: 7, repeat: Infinity, repeatType: "mirror" }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Edge, auth, and transport posture</span>
              <span>03:12 synced</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {previewCards.map((card) => (
              <div key={card.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <card.icon className={`h-4 w-4 ${card.tone}`} />
                <p className="mt-4 text-2xl font-semibold text-white">{card.value}</p>
                <p className="text-xs text-slate-500">{card.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.86),rgba(11,15,25,0.94))] p-4">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Sparkles className="h-4 w-4 text-primary" />
            Activity Stream
          </div>
          <div className="mt-4 space-y-3 font-mono text-xs">
            {[
              "routing scan workload to edge cluster",
              "validating signed requests and scopes",
              "comparing headers against policy baseline",
              "security posture stable across current run",
            ].map((line, index) => (
              <motion.div
                key={line}
                initial={{ opacity: 0.35 }}
                animate={{ opacity: [0.35, 1, 0.6] }}
                transition={{ duration: 3, delay: index * 0.6, repeat: Infinity }}
                className="rounded-xl border border-white/5 bg-black/20 px-3 py-2 text-slate-300"
              >
                <span className="mr-2 text-primary">$</span>
                {line}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default DashboardPreview;
