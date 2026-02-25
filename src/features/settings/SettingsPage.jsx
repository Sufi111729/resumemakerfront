import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { authStore } from "../../state/authStore";
import { useNavigate } from "react-router-dom";

export function SettingsPage() {
  const { user, logout } = authStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-ink/60">Update your profile and security.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-widest text-ink/50">Name</label>
          <Input defaultValue={user?.name || ""} />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-ink/50">Email</label>
          <Input defaultValue={user?.email || ""} />
        </div>
      </div>

      <Button>Save changes</Button>

      <div className="border-t border-ink/10 pt-6">
        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
