import { Card } from "../../../components/ui/Card";
import { Skeleton } from "../../../components/ui/Skeleton";
import { useEffect, useState } from "react";
import { adminDashboardApi } from "../../../api/adminDashboardApi";
import { uiStore } from "../../../state/uiStore";

export function AdminDashboardPage() {
  const { pushToast } = uiStore();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState(null);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await adminDashboardApi.metrics();
        setMetrics(res.data);
      } catch (err) {
        pushToast({ title: "Failed", message: err.message || "Metrics load failed" });
      }
      try {
        const res = await adminDashboardApi.recentActivity();
        setActivity(res.data || []);
      } catch {
        setActivity([]);
      }
      setLoading(false);
    };
    load();
  }, [pushToast]);

  const cards = metrics || {
    users: 0,
    resumes: 0,
    exportsToday: 0,
    revenueMonth: 0
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-ink/60">Overview of platform activity.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { label: "Total users", value: cards.users },
          { label: "Total resumes", value: cards.resumes },
          { label: "Exports today", value: cards.exportsToday },
          { label: "Revenue (month)", value: cards.revenueMonth }
        ].map((item) => (
          <Card key={item.label} className="p-5">
            <div className="text-xs text-ink/50">{item.label}</div>
            <div className="mt-2 text-2xl font-semibold">
              {loading ? <Skeleton className="h-6 w-20" /> : item.value}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="text-lg font-semibold">Recent activity</div>
        <div className="mt-4 space-y-3 text-sm text-ink/60">
          {loading ? (
            <Skeleton className="h-20" />
          ) : activity.length === 0 ? (
            <div>No activity yet.</div>
          ) : (
            activity.map((row, idx) => <div key={idx}>{row.description || row}</div>)
          )}
        </div>
      </Card>
    </div>
  );
}
