import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { authStore } from "../../state/authStore";

const nav = [
  { to: "/admin/users", label: "Users" },
  { to: "/admin/templates", label: "Templates" },
  { to: "/admin/payments", label: "Payments" },
  { to: "/admin/analytics", label: "Analytics" }
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout } = authStore();
  return (
    <div className="min-h-screen bg-haze text-ink">
      <div className="grid grid-cols-[220px_1fr]">
        <aside className="sticky top-0 h-screen border-r border-ink/10 bg-white">
          <div className="px-5 py-6 text-sm font-semibold flex items-center justify-between">
            <span>Admin Console</span>
            <button
              className="text-xs underline"
              onClick={() => {
                logout();
                navigate("/admin/login");
              }}
            >
              Logout
            </button>
          </div>
          <div className="px-3 space-y-2">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm ${
                    isActive ? "bg-ink text-white" : "text-ink/60 hover:bg-ink/10"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </aside>
        <main className="px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
