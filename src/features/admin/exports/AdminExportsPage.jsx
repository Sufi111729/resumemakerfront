import { useEffect, useState } from "react";
import { adminExportsApi } from "../../../api/adminExportsApi";
import { Table } from "../../../components/ui/Table";
import { Button } from "../../../components/ui/Button";
import { uiStore } from "../../../state/uiStore";

export function AdminExportsPage() {
  const { pushToast } = uiStore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminExportsApi.list();
      setData(res.data || []);
    } catch (err) {
      pushToast({ title: "Failed", message: err.message || "Could not load exports" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Exports</h1>
        <p className="text-sm text-ink/60">Monitor export jobs.</p>
      </div>
      <Table
        columns={[
          { key: "resume", label: "Resume" },
          { key: "user", label: "User" },
          { key: "status", label: "Status" },
          { key: "createdAt", label: "Created" },
          { key: "actions", label: "Actions" }
        ]}
        data={data}
        loading={loading}
        renderRow={(row) => (
          <tr key={row.id} className="border-t border-ink/5">
            <td className="px-4 py-3">{row.resumeTitle || "-"}</td>
            <td className="px-4 py-3">{row.userEmail || "-"}</td>
            <td className="px-4 py-3">{row.status}</td>
            <td className="px-4 py-3">{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}</td>
            <td className="px-4 py-3">
              <Button size="sm" variant="secondary" onClick={() => adminExportsApi.retry(row.id)}>
                Retry
              </Button>
            </td>
          </tr>
        )}
      />
    </div>
  );
}
