export function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-3xl border border-dashed border-ink/15 bg-white p-8 text-center">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink/60">{description}</p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  );
}
