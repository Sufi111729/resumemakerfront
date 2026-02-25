export function Badge({ color = "slate", className = "", ...props }) {
  const colors = {
    slate: "bg-slate/10 text-slate",
    mint: "bg-mint/30 text-ink",
    sun: "bg-sun/40 text-ink",
    coral: "bg-coral/40 text-ink"
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colors[color]} ${className}`} {...props} />
  );
}
