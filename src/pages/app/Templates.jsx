export default function Templates() {
  return (
    <div>
      <h1 className="text-3xl font-display font-semibold">Templates</h1>
      <p className="mt-2 text-sm text-ink/70">Bold, ATS‑safe layouts with typographic contrast.</p>

      <div className="mt-8 grid grid-cols-3 gap-5">
        {["Atlas", "Orchid", "Linear", "Citrus", "Muse", "Slate"].map((name, idx) => (
          <div key={name} className="card p-5">
            <div className="h-40 rounded-xl bg-ink/5" />
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm font-semibold">{name}</div>
              <button className="rounded-lg border border-ink/20 px-3 py-1 text-xs">
                {idx > 3 ? "Pro" : "Use"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
