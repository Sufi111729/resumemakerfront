import { useEffect, useState } from "react";
import { adminAnalyticsApi } from "../../../api/adminAnalyticsApi";
import { Card } from "../../../components/ui/Card";
import { Select } from "../../../components/ui/Select";
import { uiStore } from "../../../state/uiStore";

export function AdminAnalyticsPage() {
  const { pushToast } = uiStore();
  const [range, setRange] = useState("7d");
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await adminAnalyticsApi.overview(range);
        setData(res.data);
      } catch (err) {
        pushToast({ title: "Failed", message: err.message || "Analytics load failed" });
      }
    };
    load();
  }, [range, pushToast]);

  const overview = data || { views: 0, downloads: 0, conversions: 0 };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Analytics</h1>
          <p className="text-sm text-ink/60">Performance metrics and funnel.</p>
        </div>
        <Select value={range} onChange={(e) => setRange(e.target.value)}>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-5">
          <div className="text-xs text-ink/50">Views</div>
          <div className="mt-2 text-2xl font-semibold">{overview.views}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs text-ink/50">Downloads</div>
          <div className="mt-2 text-2xl font-semibold">{overview.downloads}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs text-ink/50">Conversions</div>
          <div className="mt-2 text-2xl font-semibold">{overview.conversions}</div>
        </Card>
      </div>
    </div>
  );
}
