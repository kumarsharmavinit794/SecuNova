import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import BrandMark from "@/components/BrandMark";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Platform", href: "#platform" },
  { label: "Testing", href: "#testing" },
  { label: "Pricing", href: "#pricing" },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900",
    isActive && "bg-slate-100 text-slate-900",
  );

const MarketingNavbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="page-shell flex h-18 items-center justify-between gap-4 py-4">
        <BrandMark />

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <NavLink to="/login" className={linkClass}>
            Login
          </NavLink>
          <Link to="/register" className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/95">
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open ? (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="page-shell flex flex-col gap-2 py-4">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
                {item.label}
              </a>
            ))}
            <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700">
              Login
            </Link>
            <Link to="/register" className="rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white">
              Get Started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default MarketingNavbar;
