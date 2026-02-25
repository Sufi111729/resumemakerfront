import { forwardRef } from "react";

export const Card = forwardRef(function Card({ className = "", ...props }, ref) {
  return (
    <div ref={ref} className={`rounded-3xl bg-white shadow-soft border border-ink/10 ${className}`} {...props} />
  );
});
