import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authStore } from "../../state/authStore";
import { Button } from "../../components/ui/Button";

const nav = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/users", label: "Users" },
  { to: "/admin/templates", label: "Templates" },
  { to: "/admin/payments", label: "Payments" },
  { to: "/admin/exports", label: "Exports" },
  { to: "/admin/analytics", label: "Analytics" },
  { to: "/admin/settings", label: "Settings" }
];

export function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = authStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="flex">
        <aside className="hidden min-h-screen w-64 border-r border-ink/10 bg-white/80 p-6 lg:block">
          <div className="text-lg font-semibold">Admin Console</div>
          <div className="mt-2 text-xs text-ink/50">{user?.email}</div>
          <nav className="mt-8 space-y-2">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-2 text-sm font-medium ${
                    isActive ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/5"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-ink/10 bg-white/70 px-6 py-4 backdrop-blur">
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              Menu
            </button>
            <div className="text-sm text-ink/60">Admin Panel</div>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </header>
          <main className="mx-auto max-w-6xl p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="w-64 bg-white p-6">
            <div className="text-lg font-semibold">Admin Console</div>
            <nav className="mt-8 space-y-2">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-2 text-sm font-medium ${
                      isActive ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/5"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
