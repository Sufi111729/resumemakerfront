export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-2 rounded-2xl bg-ink/5 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`rounded-2xl px-4 py-2 text-sm font-medium transition ${
            active === tab.value ? "bg-white shadow-soft" : "text-ink/60"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
