import { useEffect } from "react";
import { Link } from "react-router-dom";
import TemplateModern from "../sections/templates/TemplateModern";
import TemplateClassic from "../sections/templates/TemplateClassic";
import TemplateMinimal from "../sections/templates/TemplateMinimal";

export default function Landing() {
  useEffect(() => {
    document.title = "ProResume — ATS-Ready Resume Builder";
    setMeta("description", "Build ATS-ready resumes with modern templates, live preview, and export in minutes.");
    setMeta("og:title", "ProResume — ATS-Ready Resume Builder");
    setMeta("og:description", "High-converting resumes with clean templates, versioning, and export.");
    setMeta("og:type", "website");
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="mx-auto max-w-6xl px-8 pt-10">
        <nav className="flex items-center justify-between">
          <div className="text-lg font-display font-semibold">ProResume</div>
          <div className="flex items-center gap-4 text-sm">
            <a href="#templates" className="text-ink/70 hover:text-ink">Templates</a>
            <a href="#pricing" className="text-ink/70 hover:text-ink">Pricing</a>
            <Link to="/login" className="rounded-xl border border-ink/20 px-4 py-2">Sign In</Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-8 py-16">
          <div className="grid grid-cols-[1.1fr_0.9fr] items-center gap-10">
            <div>
              <p className="label">ProResume Studio</p>
              <h1 className="mt-4 text-5xl font-display font-semibold">
                Build an ATS‑ready resume that actually converts.
              </h1>
              <p className="mt-4 text-ink/70">
                Professional templates, live preview, version history, and export automation — built for job seekers who
                want results.
              </p>
              <div className="mt-8 flex gap-3">
                <Link to="/register" className="rounded-2xl bg-ink px-6 py-3 text-sm text-white">
                  Start Free
                </Link>
                <Link to="/login" className="rounded-2xl border border-ink/20 px-6 py-3 text-sm">
                  See Demo
                </Link>
              </div>
              <div className="mt-6 text-xs text-ink/60">No credit card required · Export in 1 click</div>
            </div>
            <div className="card p-6">
              <div className="h-72 overflow-hidden rounded-2xl border border-ink/10 bg-white p-4">
                <div className="origin-top-left scale-[0.8]">
                  <TemplateModern data={sample} />
                </div>
              </div>
              <div className="mt-4 text-sm text-ink/60">Live preview + export in seconds.</div>
            </div>
          </div>
        </section>

        <section id="templates" className="mx-auto max-w-6xl px-8 py-12">
          <h2 className="text-3xl font-display font-semibold">Template Previews</h2>
          <p className="mt-2 text-sm text-ink/70">Clean, ATS-safe typography with strong hierarchy.</p>
          <div className="mt-6 grid grid-cols-3 gap-5">
            {[
              { name: "Atlas", Comp: TemplateModern },
              { name: "Orchid", Comp: TemplateClassic },
              { name: "Linear", Comp: TemplateMinimal }
            ].map(({ name, Comp }) => (
              <article key={name} className="card p-5">
                <div className="h-40 overflow-hidden rounded-xl border border-ink/10 bg-white p-3">
                  <div className="origin-top-left scale-[0.75]">
                    <Comp data={sample} />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-semibold">{name}</div>
                  <span className="text-xs text-ink/60">ATS Ready</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-8 py-12">
          <h2 className="text-3xl font-display font-semibold">How It Works</h2>
          <div className="mt-6 grid grid-cols-3 gap-5">
            {[
              { title: "Write once", text: "Use guided sections and smart prompts." },
              { title: "Preview live", text: "See changes instantly with ATS-safe layouts." },
              { title: "Export fast", text: "Generate PDF and share links in one click." }
            ].map((step, i) => (
              <article key={step.title} className="card p-6">
                <div className="text-xs text-ink/50">Step {i + 1}</div>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-8 py-12">
          <h2 className="text-3xl font-display font-semibold">ATS-Friendly Benefits</h2>
          <div className="mt-6 grid grid-cols-2 gap-5">
            {[
              "Text-based PDF exports (no image resumes).",
              "Keyword coverage and section completeness hints.",
              "Consistent spacing and hierarchy for scanners.",
              "No hidden elements or layout traps."
            ].map((benefit) => (
              <div key={benefit} className="card p-5 text-sm text-ink/70">
                {benefit}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-8 py-12">
          <h2 className="text-3xl font-display font-semibold">Testimonials</h2>
          <div className="mt-6 grid grid-cols-3 gap-5">
            {[
              { name: "Ria S.", quote: "Got 4 interviews in a week. The templates are clean and ATS‑friendly." },
              { name: "Manav K.", quote: "Version history saved me. I tailor resumes in minutes now." },
              { name: "Zoya P.", quote: "Best resume tool I’ve used. Export is instant and looks professional." }
            ].map((t) => (
              <figure key={t.name} className="card p-6">
                <blockquote className="text-sm text-ink/70">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-xs text-ink/50">{t.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-8 py-12">
          <h2 className="text-3xl font-display font-semibold">Pricing</h2>
          <div className="mt-6 grid grid-cols-4 gap-5">
            {[
              { name: "Free", price: "₹0", perks: "3 exports/day" },
              { name: "Pro Monthly", price: "₹399", perks: "Unlimited exports" },
              { name: "Pro Yearly", price: "₹3499", perks: "Save 25%" },
              { name: "Lifetime", price: "₹2499", perks: "One‑time purchase" }
            ].map((plan) => (
              <article key={plan.name} className="card p-6">
                <div className="text-xs uppercase tracking-widest text-ink/50">{plan.name}</div>
                <div className="mt-4 text-3xl font-display font-semibold">{plan.price}</div>
                <div className="mt-2 text-sm text-ink/60">{plan.perks}</div>
                <Link to="/register" className="mt-6 inline-block rounded-2xl bg-ink px-4 py-2 text-sm text-white">
                  Choose
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-8 py-12">
          <h2 className="text-3xl font-display font-semibold">FAQ</h2>
          <div className="mt-6 grid grid-cols-2 gap-5">
            {[
              { q: "Is it ATS friendly?", a: "Yes. All templates export text-based PDFs." },
              { q: "Can I version my resume?", a: "Yes. Save and restore versions anytime." },
              { q: "Do you support sharing?", a: "Yes. Generate secure public share links." },
              { q: "Is there a free plan?", a: "Yes. Free plan includes 3 exports/day." }
            ].map((faq) => (
              <article key={faq.q} className="card p-5">
                <h3 className="text-sm font-semibold">{faq.q}</h3>
                <p className="mt-2 text-sm text-ink/70">{faq.a}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-8 py-10 text-sm text-ink/60">
        <div className="flex items-center justify-between">
          <span>© 2026 ProResume</span>
          <div className="flex gap-4">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="mailto:support@proresume.com">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    if (name.startsWith("og:")) tag.setAttribute("property", name);
    else tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

const sample = {
  name: "Aarav Patel",
  title: "Senior Backend Engineer",
  sections: [
    { title: "Summary", content: "Impact-driven engineer with 5+ years building SaaS." },
    { title: "Experience", content: "ProResume · 2022–Present\nSpring Boot, React, MySQL" },
    { title: "Skills", content: "Java, Spring, React, SQL" }
  ]
};
