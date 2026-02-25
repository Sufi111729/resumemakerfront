import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { TemplateModern } from "../resume/templates/TemplateModern";
import { TemplateClassic } from "../resume/templates/TemplateClassic";

const previewData = {
  personal: { fullName: "Aarav Singh", title: "Product Engineer", email: "aarav@email.com" },
  summary: "Product-focused engineer with 5+ years building fintech platforms and design systems.",
  experience: [
    {
      id: "exp_1",
      role: "Product Engineer",
      company: "Studio Labs",
      start: "2022",
      end: "Present",
      bullets: ["Led ATS-optimized resume builder to 35% higher conversions."]
    }
  ],
  education: [{ id: "edu_1", school: "IIT", degree: "B.Tech", start: "2016", end: "2020" }],
  projects: [{ id: "proj_1", name: "ProResume", summary: "Live preview + export automation." }],
  skills: ["React", "Spring Boot", "PostgreSQL"]
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-lg font-semibold">ProResume</div>
        <nav className="flex items-center gap-6 text-sm text-ink/60">
          <a href="#templates">Templates</a>
          <a href="#pricing">Pricing</a>
          <Link to="/login" className="rounded-full border border-ink/15 px-4 py-2 text-ink">
            Sign In
          </Link>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6">
        <section className="grid items-center gap-10 py-12 lg:grid-cols-[1.1fr,1fr]">
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-ink/40">ProResume Studio</div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight">
              Build an ATS-ready resume that actually converts.
            </h1>
            <p className="mt-4 text-base text-ink/60">
              Professional templates, live preview, version history, and export automation — built for job seekers who want results.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/register">
                <Button>Start Free</Button>
              </Link>
              <Button variant="secondary">See Demo</Button>
            </div>
            <div className="mt-4 text-xs text-ink/50">No credit card required • Export in 1 click</div>
          </div>
          <Card className="p-6">
            <div className="rounded-2xl border border-ink/10 bg-white p-4">
              <div className="scale-[0.85] origin-top-left">
                <TemplateModern data={previewData} />
              </div>
            </div>
            <div className="mt-3 text-xs text-ink/50">Live preview + export in seconds.</div>
          </Card>
        </section>

        <section id="templates" className="py-10">
          <h2 className="text-2xl font-semibold">Template Previews</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card className="p-5">
              <div className="rounded-2xl border border-ink/10 bg-white p-3">
                <div className="scale-[0.75] origin-top-left">
                  <TemplateModern data={previewData} />
                </div>
              </div>
              <div className="mt-4 font-medium">Atlas</div>
            </Card>
            <Card className="p-5">
              <div className="rounded-2xl border border-ink/10 bg-white p-3">
                <div className="scale-[0.75] origin-top-left">
                  <TemplateClassic data={previewData} />
                </div>
              </div>
              <div className="mt-4 font-medium">Orchid</div>
            </Card>
            <Card className="p-5">
              <div className="rounded-2xl border border-ink/10 bg-white p-3">
                <div className="scale-[0.75] origin-top-left">
                  <TemplateModern data={{ ...previewData, personal: { fullName: "Maya Rao", title: "UX Designer", email: "maya@email.com" } }} />
                </div>
              </div>
              <div className="mt-4 font-medium">Linear</div>
            </Card>
          </div>
        </section>

        <section className="py-10">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { title: "Choose a template", desc: "Start with a clean, ATS-friendly layout." },
              { title: "Fill sections", desc: "Guided forms with real-time preview." },
              { title: "Export & apply", desc: "One click export and share links." }
            ].map((step) => (
              <Card key={step.title} className="p-6">
                <div className="text-lg font-semibold">{step.title}</div>
                <div className="mt-2 text-sm text-ink/60">{step.desc}</div>
              </Card>
            ))}
          </div>
        </section>

        <section id="pricing" className="py-10">
          <h2 className="text-2xl font-semibold">Pricing</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {[
              { name: "Free", price: "₹0", features: ["1 resume", "Basic templates", "Watermark"] },
              { name: "Pro", price: "₹299/mo", features: ["Unlimited resumes", "Premium templates", "No watermark"] },
              { name: "Lifetime", price: "₹1999", features: ["One-time", "All templates", "Priority export"] }
            ].map((plan) => (
              <Card key={plan.name} className="p-6">
                <div className="text-lg font-semibold">{plan.name}</div>
                <div className="mt-2 text-3xl font-semibold">{plan.price}</div>
                <ul className="mt-4 space-y-2 text-sm text-ink/60">
                  {plan.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
                <Button className="mt-6 w-full">Choose {plan.name}</Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-10">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="mt-6 grid gap-4">
            {[
              { q: "Is it ATS-friendly?", a: "Yes. We use text-based PDF exports." },
              { q: "Can I export multiple versions?", a: "Yes. Version history is built-in." },
              { q: "Do I need a credit card?", a: "No. Start for free." }
            ].map((item) => (
              <Card key={item.q} className="p-5">
                <div className="font-medium">{item.q}</div>
                <div className="mt-2 text-sm text-ink/60">{item.a}</div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t border-ink/10 bg-white/60 py-6">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 text-sm text-ink/60">
          <div>© 2026 ProResume</div>
          <div className="flex gap-4">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
