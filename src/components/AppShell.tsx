import type { ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Bell, CircleUserRound, CreditCard, LayoutDashboard, Search, Settings, Shield, TerminalSquare } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/testing", label: "Testing", icon: TerminalSquare },
  { to: "/payment", label: "Billing", icon: CreditCard },
  { to: "/settings", label: "Settings", icon: Settings },
];

const AppShell = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();
  const location = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-6 pt-24 md:px-6">
      <div className="pointer-events-none absolute inset-0 cyber-grid opacity-30" />
      <div className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[240px,minmax(0,1fr)]">
        <aside className="glass-panel hidden rounded-[2rem] p-4 lg:block">
          <Link to="/" className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">ShieldTest</p>
              <p className="text-xs text-slate-500">Operations</p>
            </div>
          </Link>

          <div className="mt-8 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "group flex items-center gap-3 rounded-[1.2rem] border border-transparent px-4 py-3 text-sm text-slate-400 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03] hover:text-white",
                    isActive && "border-primary/20 bg-primary/10 text-white shadow-[0_16px_34px_rgba(99,102,241,0.14)]",
                  )
                }
              >
                <item.icon className={cn("h-4 w-4", location.pathname === item.to ? "text-primary" : "text-slate-500")} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Workspace</p>
            <p className="mt-2 text-sm font-medium text-white">Premium security testing</p>
            <p className="mt-2 text-xs leading-6 text-slate-500">Clean operations UI for domain posture, API checks, and billing control.</p>
          </div>
        </aside>

        <div className="space-y-6">
          <header className="glass-panel flex flex-col gap-4 rounded-[2rem] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.38em] text-slate-500">Security Platform</p>
              <h1 className="mt-2 text-2xl font-semibold text-white">
                {location.pathname === "/dashboard"
                  ? "Executive Threat Overview"
                  : location.pathname === "/testing"
                    ? "Interactive Scan Console"
                    : location.pathname === "/payment"
                      ? "Billing Intelligence"
                      : "Platform Settings"}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px] flex-1 sm:flex-none">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search scans, alerts, APIs"
                  className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] pl-11 pr-4 text-sm text-white outline-none transition focus:border-primary/50 focus:shadow-[0_0_0_1px_rgba(99,102,241,0.35)]"
                />
              </div>
              <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:border-primary/30 hover:text-white">
                <Bell className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/30 to-sky-500/30 text-primary">
                  <CircleUserRound className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{user?.name || "Operator"}</p>
                  <p className="text-xs text-slate-500">{user?.role || "Security Lead"}</p>
                </div>
              </div>
            </div>
          </header>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AppShell;
