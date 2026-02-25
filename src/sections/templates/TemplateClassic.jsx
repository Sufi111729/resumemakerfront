export default function TemplateClassic({ data }) {
  return (
    <div className="text-sm font-serif">
      <div className="border-b border-ink/20 pb-3">
        <div className="text-2xl font-semibold">{data.name}</div>
        <div className="text-xs text-ink/60">{data.title}</div>
      </div>
      <div className="mt-4 space-y-3">
        {data.sections.map((s) => (
          <div key={s.title}>
            <div className="text-[11px] uppercase tracking-[0.2em] text-ink/60">{s.title}</div>
            <div className="mt-2 whitespace-pre-line leading-relaxed">{s.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
