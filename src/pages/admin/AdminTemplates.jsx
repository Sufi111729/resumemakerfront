import TemplateModern from "../../sections/templates/TemplateModern";
import TemplateClassic from "../../sections/templates/TemplateClassic";
import TemplateMinimal from "../../sections/templates/TemplateMinimal";

const sample = {
  name: "Aarav Patel",
  title: "Senior Backend Engineer",
  sections: [
    { title: "Summary", content: "Impact-driven engineer with 5+ years building SaaS." },
    { title: "Experience", content: "ProResume · 2022–Present\nSpring Boot, React, MySQL" },
    { title: "Skills", content: "Java, Spring, React, SQL" }
  ]
};

export default function AdminTemplates() {
  return (
    <div>
      <h1 className="text-2xl font-display font-semibold">Templates</h1>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          { name: "Atlas", Comp: TemplateModern },
          { name: "Orchid", Comp: TemplateClassic },
          { name: "Linear", Comp: TemplateMinimal }
        ].map(({ name, Comp }) => (
          <div key={name} className="card p-4">
            <div className="h-40 overflow-hidden rounded-xl border border-ink/10 bg-white p-3">
              <div className="origin-top-left scale-[0.75]">
                <Comp data={sample} />
              </div>
            </div>
            <div className="mt-3 text-sm font-semibold">{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
