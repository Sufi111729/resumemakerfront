import TemplateModern from "./templates/TemplateModern";
import TemplateClassic from "./templates/TemplateClassic";
import TemplateMinimal from "./templates/TemplateMinimal";

const templates = {
  Modern: TemplateModern,
  Classic: TemplateClassic,
  Minimal: TemplateMinimal
};

export default function Preview({ template = "Modern", data }) {
  const Template = templates[template] || TemplateModern;
  const safeData = data || { name: "", title: "", sections: [] };
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 text-sm print:p-0 print:border-0">
      <Template data={safeData} />
    </div>
  );
}
