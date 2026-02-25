import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-ink/60">Your resume activity at a glance.</p>
        </div>
        <Link to="/app/resumes">
          <Button>Create Resume</Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Total resumes", value: "3" },
          { label: "Exports this month", value: "4" },
          { label: "Plan", value: "Free" }
        ].map((card) => (
          <Card key={card.label} className="p-6">
            <div className="text-sm text-ink/60">{card.label}</div>
            <div className="mt-2 text-2xl font-semibold">{card.value}</div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="text-lg font-semibold">Recent resumes</div>
        <div className="mt-4 space-y-3 text-sm text-ink/60">
          <div>Software Engineer Resume • Updated today</div>
          <div>Product Designer Resume • Updated yesterday</div>
        </div>
      </Card>
    </div>
  );
}
