import { useEffect, useState } from "react";
import { adminPaymentsApi } from "../../../api/adminPaymentsApi";
import { Table } from "../../../components/ui/Table";
import { uiStore } from "../../../state/uiStore";

export function AdminPaymentsPage() {
  const { pushToast } = uiStore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await adminPaymentsApi.list();
        setData(res.data || []);
      } catch (err) {
        pushToast({ title: "Failed", message: err.message || "Could not load payments" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [pushToast]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Payments</h1>
        <p className="text-sm text-ink/60">Track payments and subscriptions.</p>
      </div>
      <Table
        columns={[
          { key: "user", label: "User" },
          { key: "amount", label: "Amount" },
          { key: "status", label: "Status" },
          { key: "provider", label: "Provider" },
          { key: "createdAt", label: "Created" }
        ]}
        data={data}
        loading={loading}
        renderRow={(row) => (
          <tr key={row.id} className="border-t border-ink/5">
            <td className="px-4 py-3">{row.userEmail || row.user}</td>
            <td className="px-4 py-3">{row.amount}</td>
            <td className="px-4 py-3">{row.status}</td>
            <td className="px-4 py-3">{row.provider}</td>
            <td className="px-4 py-3">{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}</td>
          </tr>
        )}
      />
    </div>
  );
}
