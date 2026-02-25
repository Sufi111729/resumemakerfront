export function TemplateClassic({ data }) {
  const { personal = {}, summary = "", experience = [], education = [], projects = [], skills = [] } = data || {};
  const normalizeUrl = (value) => {
    const text = (value || "").trim();
    if (!text) return "";
    return /^https?:\/\//i.test(text) ? text : `https://${text}`;
  };

  return (
    <div className="space-y-4 text-sm font-serif">
      <div className="border-b border-ink/20 pb-2">
        <div className="text-2xl font-semibold tracking-wide">{personal.fullName || "Your Name"}</div>
        <div className="text-ink/60">{personal.title || "Role"}</div>
        <div className="text-ink/50">{personal.email || "email@example.com"}</div>
      </div>
      <section>
        <div className="text-xs uppercase tracking-[0.2em] text-ink/40">Summary</div>
        <p className="mt-1 text-ink/70">{summary || "Short professional summary."}</p>
      </section>
      <section>
        <div className="text-xs uppercase tracking-[0.2em] text-ink/40">Experience</div>
        <div className="mt-2 space-y-2">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="font-medium">{exp.role || "Role"} • {exp.company || "Company"}</div>
              <div className="text-ink/50 text-xs">{exp.start} - {exp.end}</div>
              <ul className="list-disc pl-4 text-ink/70">
                {(exp.bullets || []).map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="text-xs uppercase tracking-[0.2em] text-ink/40">Education</div>
        <div className="mt-2 space-y-2">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="font-medium">{edu.school || "School"}</div>
              <div className="text-ink/50 text-xs">{edu.degree || "Degree"} • {edu.start} - {edu.end}</div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="text-xs uppercase tracking-[0.2em] text-ink/40">Projects</div>
        <div className="mt-2 space-y-2">
          {projects.map((proj) => (
            <div key={proj.id}>
              <div className="font-medium">{proj.name || "Project"}</div>
              <div className="text-ink/60">{proj.summary || "Project summary"}</div>
              {proj.githubUrl || proj.liveUrl ? (
                <div className="mt-1 flex flex-wrap gap-3 text-xs text-ink/60">
                  {proj.githubUrl ? (
                    <a href={normalizeUrl(proj.githubUrl)} target="_blank" rel="noreferrer" className="underline">
                      GitHub
                    </a>
                  ) : null}
                  {proj.liveUrl ? (
                    <a href={normalizeUrl(proj.liveUrl)} target="_blank" rel="noreferrer" className="underline">
                      Live
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="text-xs uppercase tracking-[0.2em] text-ink/40">Skills</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {(skills || []).map((skill, i) => (
            <span key={i} className="rounded-full bg-ink/5 px-3 py-1 text-xs">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
