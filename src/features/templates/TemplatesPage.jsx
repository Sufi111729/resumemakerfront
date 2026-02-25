import { useEffect, useState } from "react";
import { templatesApi } from "../../api/templatesApi";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { TemplateModern } from "../resume/templates/TemplateModern";
import { TemplateClassic } from "../resume/templates/TemplateClassic";

export function TemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    templatesApi.list().then((res) => setTemplates(res.data || [])).catch(() => setTemplates([]));
  }, []);

  const renderPreview = () => {
    if (preview?.key === "classic") return <TemplateClassic data={{}} />;
    return <TemplateModern data={{}} />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Templates</h1>
        <p className="text-sm text-ink/60">Pick a template that matches your style.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {templates.map((tpl) => (
          <Card key={tpl.id} className="p-5">
            <div className="h-32 rounded-2xl bg-ink/5" />
            <div className="mt-4 flex items-center justify-between">
              <div className="font-medium">{tpl.name}</div>
              {tpl.isPremium ? <span className="text-xs text-ink/50">Pro</span> : null}
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setPreview(tpl)}>
                Preview
              </Button>
              <Button size="sm">Use</Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={!!preview} onClose={() => setPreview(null)} title="Template preview">
        <div className="rounded-2xl border border-ink/10 bg-white p-4">
          {preview ? renderPreview() : null}
        </div>
      </Modal>
    </div>
  );
}
