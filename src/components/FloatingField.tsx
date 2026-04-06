import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
}

const FloatingField = forwardRef<HTMLInputElement, FloatingFieldProps>(
  ({ className, label, icon, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          placeholder=" "
          className={cn(
            "peer h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 pb-3 pt-6 text-sm text-white outline-none transition duration-300 placeholder:text-transparent focus:border-primary/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_1px_rgba(99,102,241,0.35),0_12px_30px_rgba(99,102,241,0.12)]",
            icon && "pl-12",
            className,
          )}
          {...props}
        />
        {icon ? (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors peer-focus:text-primary peer-[:not(:placeholder-shown)]:text-slate-300">
            {icon}
          </div>
        ) : null}
        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 text-sm text-slate-400 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:-translate-y-0 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-4 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-xs",
            icon ? "left-12" : "left-4",
          )}
        >
          {label}
        </label>
      </div>
    );
  },
);

FloatingField.displayName = "FloatingField";

export default FloatingField;
