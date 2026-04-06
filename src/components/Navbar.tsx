import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LogOut, Menu, Shield, UserRound, X } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useSettingsStore } from "@/store/settingsStore";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuthStore();
  const { plan } = useSettingsStore();

  const publicLinks = [
    { to: "/login", label: "Login" },
  ];

  const appLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/testing", label: "Testing" },
    { to: "/payment", label: plan === "pro" ? "Billing" : "Upgrade" },
  ];

  const links = isAuthenticated ? appLinks : publicLinks;

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[rgba(17,24,39,0.62)] px-5 py-3 backdrop-blur-2xl shadow-[0_18px_60px_rgba(4,9,24,0.34)]">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-slate-200">ShieldTest</p>
            <p className="text-xs text-slate-500">Security testing SaaS</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition",
                location.pathname === link.to
                  ? "border border-primary/30 bg-primary/10 text-primary"
                  : "text-slate-300 hover:bg-white/[0.04] hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <Link to="/settings" className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-primary/30 hover:bg-white/[0.04]">
                <UserRound className="h-4 w-4" />
                Profile
              </Link>
              <button
                onClick={logout}
                className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-red-400/30 hover:text-white"
              >
                <span className="inline-flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </span>
              </button>
            </>
          ) : (
            <Link to="/register" className="button-lift inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#6366F1,#0EA5E9)] px-5 py-2 text-sm font-medium text-white shadow-[0_14px_30px_rgba(99,102,241,0.24)]">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        <button
          onClick={() => setMobileOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 md:hidden"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="mx-auto mt-3 max-w-7xl rounded-[1.75rem] border border-white/10 bg-[rgba(17,24,39,0.92)] p-4 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/[0.04]"
                >
                  {link.label}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link to="/settings" onClick={() => setMobileOpen(false)} className="rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-white/[0.04]">
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="rounded-2xl px-4 py-3 text-left text-sm text-slate-200 transition hover:bg-white/[0.04]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl bg-[linear-gradient(135deg,#6366F1,#0EA5E9)] px-4 py-3 text-sm font-medium text-white"
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
