import { useEffect, useState } from "react";
import { adminTemplatesApi } from "../../../api/adminTemplatesApi";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import { Select } from "../../../components/ui/Select";
import { uiStore } from "../../../state/uiStore";

export function AdminTemplatesPage() {
  const { pushToast } = uiStore();
  const [templates, setTemplates] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "General", isPremium: false, status: "Active" });

  const load = async () => {
    try {
      const res = await adminTemplatesApi.list();
      setTemplates(res.data || []);
    } catch (err) {
      pushToast({ title: "Failed", message: err.message || "Could not load templates" });
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    try {
      await adminTemplatesApi.create(form);
      setOpen(false);
      setForm({ name: "", category: "General", isPremium: false, status: "Active" });
      load();
    } catch (err) {
      pushToast({ title: "Failed", message: err.message || "Could not create template" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Templates</h1>
          <p className="text-sm text-ink/60">Manage resume templates.</p>
        </div>
        <Button onClick={() => setOpen(true)}>New Template</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {templates.map((tpl) => (
          <Card key={tpl.id} className="p-5">
            <div className="text-lg font-semibold">{tpl.name}</div>
            <div className="mt-2 text-sm text-ink/60">{tpl.category || "General"}</div>
            <div className="mt-3 text-xs text-ink/50">{tpl.isPremium ? "Premium" : "Free"}</div>
            <Button size="sm" className="mt-4" variant="secondary">Edit</Button>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create template">
        <div className="space-y-4">
          <Input placeholder="Template name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>General</option>
            <option>Tech</option>
            <option>Creative</option>
          </Select>
          <Select value={form.isPremium ? "yes" : "no"} onChange={(e) => setForm({ ...form, isPremium: e.target.value === "yes" })}>
            <option value="no">Free</option>
            <option value="yes">Premium</option>
          </Select>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </Modal>
    </div>
  );
}
