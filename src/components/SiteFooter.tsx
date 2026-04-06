import { Shield, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SiteFooter = () => {
  const location = useLocation();
  const hideOnAppShell = ["/dashboard", "/testing", "/payment", "/settings"].includes(location.pathname);

  if (hideOnAppShell) {
    return null;
  }

  return (
    <footer className="px-4 pb-8 pt-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950/60 px-6 py-8 backdrop-blur-xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.25em] text-slate-300">ShieldTest</p>
                <p className="text-xs text-slate-500">Next-gen domain and API security testing</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Premium security intelligence for modern teams. Run deep scans, monitor API posture, and move from reactive testing to continuous defense.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/login" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-400/30 hover:text-white">
              Login
            </Link>
            <Link to="/register" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-sky-400/30 hover:text-white">
              Register
            </Link>
            <Link to="/payment" className="rounded-full bg-[linear-gradient(135deg,#22c55e,#3b82f6)] px-4 py-2 text-sm font-medium text-slate-950">
              Upgrade to PRO
            </Link>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} ShieldTest. Engineered for modern security teams.</span>
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Zero-clutter cyber SaaS frontend
          </span>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
