import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

interface DashboardTopbarProps {
  onOpenSidebar: () => void;
}

const DashboardTopbar = ({ onOpenSidebar }: DashboardTopbarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-slate-50/90 backdrop-blur">
      <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden max-w-md flex-1 md:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tests, domains, reports"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button type="button" className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300">
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-sky-500" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:border-slate-300"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-primary">
                {(user?.name ?? "GS").slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden text-left sm:block">
                <div className="text-sm font-semibold text-slate-900">{user?.name ?? "Guard Admin"}</div>
                <div className="text-xs text-slate-500">{user?.role ?? "Security Lead"}</div>
              </div>
              <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
            </button>

            {menuOpen ? (
              <div className="absolute right-0 top-[calc(100%+12px)] w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/settings");
                  }}
                  className="flex w-full rounded-xl px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                >
                  Profile Settings
                </button>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="flex w-full rounded-xl px-3 py-2.5 text-left text-sm text-rose-600 transition hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;
