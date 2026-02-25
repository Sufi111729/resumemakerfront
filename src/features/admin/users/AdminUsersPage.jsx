import { useEffect, useState } from "react";
import { adminUsersApi } from "../../../api/adminUsersApi";
import { Table } from "../../../components/ui/Table";
import { Pagination } from "../../../components/ui/Pagination";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { uiStore } from "../../../state/uiStore";

const PLAN_OPTIONS = ["FREE", "PRO_MONTHLY", "PRO_YEARLY", "LIFETIME"];
const STATUS_OPTIONS = ["ACTIVE", "CANCELED", "PAST_DUE"];

export function AdminUsersPage() {
  const { pushToast } = uiStore();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [planDrafts, setPlanDrafts] = useState({});
  const [savingPlanId, setSavingPlanId] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await adminUsersApi.list({ query, page });
      const rows = res.data?.items || res.data || [];
      setData(rows);
      setPlanDrafts((prev) => {
        const next = { ...prev };
        rows.forEach((row) => {
          if (!next[row.id]) {
            next[row.id] = {
              plan: row.plan || "FREE",
              status: row.status || "ACTIVE",
              validUntil: ""
            };
          }
        });
        return next;
      });
    } catch (err) {
      pushToast({ title: "Failed", message: err.message || "Could not load users" });
    } finally {
      setLoading(false);
    }
  };

  const updateDraft = (id, key, value) => {
    setPlanDrafts((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [key]: value }
    }));
  };

  const savePlan = async (userId) => {
    const draft = planDrafts[userId] || {};
    setSavingPlanId(userId);
    try {
      const payload = {
        plan: draft.plan || "FREE",
        status: draft.status || "ACTIVE"
      };
      if (draft.validUntil) {
        payload.validUntil = `${draft.validUntil}T23:59:59+05:30`;
      }
      const res = await adminUsersApi.updatePlan(userId, payload);
      const updated = res.data;
      setData((prev) => prev.map((row) => (row.id === userId ? updated : row)));
      pushToast({ title: "Updated", message: "Plan updated successfully" });
    } catch (err) {
      pushToast({ title: "Failed", message: err.message || "Could not update plan" });
    } finally {
      setSavingPlanId(null);
    }
  };

  useEffect(() => {
    load();
  }, [page]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Users</h1>
          <p className="text-sm text-ink/60">Manage platform users.</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Input placeholder="Search users" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button
          variant="secondary"
          onClick={() => {
            setPage(1);
            load();
          }}
        >
          Search
        </Button>
      </div>

      <Table
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "plan", label: "Plan" },
          { key: "status", label: "Status" },
          { key: "createdAt", label: "Created" },
          { key: "actions", label: "Actions" }
        ]}
        data={data}
        loading={loading}
        renderRow={(row) => (
          <tr key={row.id} className="border-t border-ink/5">
            <td className="px-4 py-3">{row.name || "-"}</td>
            <td className="px-4 py-3">{row.email}</td>
            <td className="px-4 py-3">
              <select
                className="h-9 rounded-xl border border-ink/15 px-2 text-sm"
                value={planDrafts[row.id]?.plan || "FREE"}
                onChange={(e) => updateDraft(row.id, "plan", e.target.value)}
              >
                {PLAN_OPTIONS.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-4 py-3">
              <select
                className="h-9 rounded-xl border border-ink/15 px-2 text-sm"
                value={planDrafts[row.id]?.status || "ACTIVE"}
                onChange={(e) => updateDraft(row.id, "status", e.target.value)}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-4 py-3">{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-"}</td>
            <td className="px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="date"
                  className="h-9 rounded-xl border border-ink/15 px-2 text-sm"
                  value={planDrafts[row.id]?.validUntil || ""}
                  onChange={(e) => updateDraft(row.id, "validUntil", e.target.value)}
                />
                <Button
                  size="sm"
                  variant="secondary"
                  disabled={savingPlanId === row.id}
                  onClick={() => savePlan(row.id)}
                >
                  {savingPlanId === row.id ? "Saving..." : "Save Plan"}
                </Button>
              </div>
            </td>
          </tr>
        )}
      />

      <Pagination page={page} totalPages={5} onPageChange={setPage} />
    </div>
  );
}
