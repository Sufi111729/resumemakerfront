import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { authStore } from "../../../state/authStore";
import { useNavigate } from "react-router-dom";

export function AdminSettingsPage() {
  const { user, logout } = authStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-ink/60">Admin preferences and site settings.</p>
      </div>

      <Card className="p-6">
        <div className="text-sm text-ink/60">Profile</div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input defaultValue={user?.email || ""} />
          <Input defaultValue={user?.role || "ADMIN"} />
        </div>
      </Card>

      <Card className="p-6">
        <div className="text-sm text-ink/60">Site settings (placeholders)</div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Input placeholder="Pricing toggle" />
          <Input placeholder="Watermark rule" />
        </div>
      </Card>

      <Button variant="secondary" onClick={handleLogout}>Logout</Button>
    </div>
  );
}
