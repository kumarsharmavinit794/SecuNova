import { Link } from "react-router-dom";
import BrandMark from "@/components/BrandMark";

const MarketingFooter = () => (
  <footer className="border-t border-slate-200 bg-white">
    <div className="page-shell flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
      <BrandMark />
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
        <a href="#platform" className="transition hover:text-slate-900">Platform</a>
        <a href="#pricing" className="transition hover:text-slate-900">Pricing</a>
        <Link to="/login" className="transition hover:text-slate-900">Login</Link>
      </div>
    </div>
  </footer>
);

export default MarketingFooter;
