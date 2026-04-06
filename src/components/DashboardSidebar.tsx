import { CreditCard, FileBarChart2, LayoutDashboard, Settings, TestTube2, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import BrandMark from "@/components/BrandMark";
import { cn } from "@/lib/utils";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/testing", label: "Testing", icon: TestTube2 },
  { to: "/reports", label: "Reports", icon: FileBarChart2 },
  { to: "/payment", label: "Payments", icon: CreditCard },
  { to: "/settings", label: "Settings", icon: Settings },
];

interface DashboardSidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

const DashboardSidebar = ({ mobile = false, onClose }: DashboardSidebarProps) => (
  <aside className="flex h-full w-full flex-col border-r border-slate-200 bg-white">
    <div className="flex items-center justify-between px-5 py-5">
      <BrandMark to="/dashboard" />
      {mobile ? (
        <button type="button" onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 lg:hidden">
          <X className="h-5 w-5" />
        </button>
      ) : null}
    </div>

    <nav className="flex-1 space-y-1 px-3 py-4">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900",
              isActive && "bg-indigo-50 text-primary",
            )
          }
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>

    <div className="p-4">
      <div className="rounded-2xl bg-slate-50 p-4">
        <div className="text-sm font-semibold text-slate-900">Need unlimited scans?</div>
        <div className="mt-1 text-sm leading-6 text-slate-500">Upgrade to Pro for higher test volume and richer reporting.</div>
        <Link to="/payment" className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white">
          View Plans
        </Link>
      </div>
    </div>
  </aside>
);

export default DashboardSidebar;
