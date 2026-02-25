import { forwardRef } from "react";

export const Select = forwardRef(function Select({ className = "", children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={`w-full rounded-2xl border border-ink/10 bg-white px-3 py-2 text-sm outline-none focus:border-ink/40 focus:ring-2 focus:ring-ink/10 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
});
