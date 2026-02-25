export default function TemplateMinimal({ data }) {
  return (
    <div className="text-sm">
      <div className="text-xl font-semibold tracking-tight">{data.name}</div>
      <div className="text-[11px] text-ink/60">{data.title}</div>
      <div className="mt-4 grid gap-3">
        {data.sections.map((s) => (
          <div key={s.title}>
            <div className="text-[10px] uppercase tracking-widest text-ink/50">{s.title}</div>
            <div className="mt-1 whitespace-pre-line text-[12px] leading-relaxed">{s.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
