import { useParams } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { TemplateModern } from "../resume/templates/TemplateModern";

export function PublicResumePage() {
  const { slug } = useParams();
  return (
    <div className="min-h-screen bg-cream px-6 py-10 text-ink">
      <div className="mx-auto max-w-4xl">
        <Card className="p-6">
          <TemplateModern data={{}} />
        </Card>
        <div className="mt-4 text-xs text-ink/50">Public resume: {slug}</div>
      </div>
    </div>
  );
}
