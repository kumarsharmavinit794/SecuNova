import { motion } from "framer-motion";
import { ArrowRight, BarChart3, CreditCard, ShieldCheck, TableProperties, TestTube2 } from "lucide-react";
import { Link } from "react-router-dom";
import BrandMark from "@/components/BrandMark";
import PageTransition from "@/components/PageTransition";

const featureCards = [
  {
    icon: TestTube2,
    title: "Unified test workspace",
    description: "Run domain and API checks from one clean operator console with clear test outcomes.",
  },
  {
    icon: BarChart3,
    title: "Executive-ready reporting",
    description: "Surface activity trends, issue counts, and operational metrics in a format teams can actually use.",
  },
  {
    icon: CreditCard,
    title: "Simple commercial flow",
    description: "Move from trial to Pro with a billing journey that feels like a real SaaS product.",
  },
];

const stats = [
  { value: "2.4k", label: "Security tests tracked monthly" },
  { value: "98.2%", label: "Average scan completion rate" },
  { value: "31%", label: "Faster issue triage for teams" },
];

const Landing = () => (
  <PageTransition>
    <div className="pb-16">
      <section className="page-shell grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div>
          <div className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-sm font-medium text-primary">
            Built for modern security and platform teams
          </div>
          <h1 className="mt-6 text-balance text-5xl font-extrabold tracking-[-0.05em] text-slate-900 sm:text-6xl">
            Professional security testing operations, packaged like a serious SaaS product.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            GuardSphere helps teams run tests, review issues, monitor activity, and manage upgrades from a polished admin experience designed for day-to-day operations.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/95">
              Start Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/login" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              View Product
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="app-card-soft p-5">
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="mt-1 text-sm leading-6 text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="app-card overflow-hidden p-6"
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <BrandMark compact />
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">Operations healthy</div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="text-sm text-slate-500">Weekly tests</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">128</div>
              <div className="mt-3 h-2 rounded-full bg-slate-200">
                <div className="h-2 w-[78%] rounded-full bg-primary" />
              </div>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="text-sm text-slate-500">Resolved issues</div>
              <div className="mt-2 text-3xl font-bold text-slate-900">24</div>
              <div className="mt-2 text-sm text-emerald-600">+12% from last week</div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">Recent scan queue</div>
                <div className="text-sm text-slate-500">Clean admin-style preview</div>
              </div>
              <TableProperties className="h-5 w-5 text-slate-400" />
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["api.acme.io/v2", "Complete", "Low risk"],
                ["portal.acme.io", "Running", "Analysis"],
                ["staging.acme.io", "Needs review", "Medium risk"],
              ].map(([name, status, detail]) => (
                <div key={name} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{name}</div>
                    <div className="text-xs text-slate-500">{detail}</div>
                  </div>
                  <div className="text-sm text-slate-600">{status}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section id="platform" className="page-shell py-8">
        <div className="mb-6">
          <div className="section-title">Everything teams need in one business-ready workspace</div>
          <div className="section-copy mt-2 max-w-2xl">
            From testing operations to leadership reporting, the platform is structured like a real internal tool rather than a design experiment.
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {featureCards.map((feature) => (
            <div key={feature.title} className="app-card hover-lift p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <div className="mt-5 text-lg font-bold text-slate-900">{feature.title}</div>
              <div className="mt-2 text-sm leading-7 text-slate-500">{feature.description}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="testing" className="page-shell py-8">
        <div className="app-card grid gap-8 p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Testing workflow</div>
            <div className="mt-3 section-title">Purpose-built for repeatable testing and predictable follow-up.</div>
            <div className="section-copy mt-3 max-w-2xl">
              Operators can run targeted scans, review structured results, and push teams toward upgrade or remediation without leaving the workspace.
            </div>
          </div>
          <div className="grid gap-4">
            {[
              "Single dashboard for status, issues, and result trends",
              "Simple test intake with built-in trial gating",
              "Clean handoff from free access to paid plans",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-xl bg-slate-50 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                <div className="text-sm leading-6 text-slate-600">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="page-shell py-8">
        <div className="app-card flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="section-title">Start free, upgrade when your team is ready</div>
            <div className="section-copy mt-2 max-w-2xl">
              The product includes local auth, protected routes, a free test limit, and a clean Pro upsell experience.
            </div>
          </div>
          <Link to="/register" className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">
            Create Account
          </Link>
        </div>
      </section>
    </div>
  </PageTransition>
);

export default Landing;
