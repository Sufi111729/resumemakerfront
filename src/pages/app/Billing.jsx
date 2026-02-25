export default function Billing() {
  return (
    <div>
      <h1 className="text-3xl font-display font-semibold">Billing</h1>
      <p className="mt-2 text-sm text-ink/70">Pick the plan that scales your job search.</p>

      <div className="mt-8 grid grid-cols-3 gap-5">
        {[
          { name: "Free", price: "₹0", perks: "3 exports/day" },
          { name: "Pro Monthly", price: "₹399", perks: "Unlimited exports" },
          { name: "Lifetime", price: "₹2499", perks: "One‑time purchase" }
        ].map((plan) => (
          <div key={plan.name} className="card p-6">
            <div className="text-xs uppercase tracking-widest text-ink/50">{plan.name}</div>
            <div className="mt-4 text-3xl font-display font-semibold">{plan.price}</div>
            <div className="mt-2 text-sm text-ink/60">{plan.perks}</div>
            <button className="mt-6 w-full rounded-2xl bg-ink px-4 py-2 text-sm text-white">
              Choose
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
