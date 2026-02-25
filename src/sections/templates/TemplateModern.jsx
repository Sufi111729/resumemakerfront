export default function TemplateModern({ data }) {
  return (
    <div className="text-sm">
      <div className="text-2xl font-semibold">{data.name}</div>
      <div className="text-xs text-ink/60">{data.title}</div>
      <div className="mt-4 space-y-3">
        {data.sections.map((s) => (
          <div key={s.title}>
            <div className="text-[11px] uppercase tracking-widest text-ink/50">{s.title}</div>
            <div className="mt-2 whitespace-pre-line">{s.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
