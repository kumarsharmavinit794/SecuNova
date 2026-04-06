import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  compact?: boolean;
  to?: string;
  className?: string;
}

const BrandMark = ({ compact = false, to = "/", className }: BrandMarkProps) => (
  <Link to={to} className={cn("flex items-center gap-3", className)}>
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
      <ShieldCheck className="h-5 w-5" />
    </div>
    {!compact ? (
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-slate-900">GuardSphere</div>
        <div className="truncate text-xs text-slate-500">Security Operations Suite</div>
      </div>
    ) : null}
  </Link>
);

export default BrandMark;
