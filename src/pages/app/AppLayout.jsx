import { Link, NavLink, Outlet } from "react-router-dom";

const nav = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/resumes", label: "Resumes" },
  { to: "/app/templates", label: "Templates" },
  { to: "/app/billing", label: "Billing" },
  { to: "/app/settings", label: "Settings" }
];

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-mint/50 blur-3xl" />
        <div className="absolute top-20 right-0 h-[420px] w-[420px] rounded-full bg-sun/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-coral/30 blur-3xl" />
      </div>

      <div className="grid grid-cols-[260px_1fr]">
        <aside className="sticky top-0 h-screen border-r border-ink/10 bg-white/70 backdrop-blur">
          <div className="px-6 py-6">
            <Link to="/app/dashboard" className="text-xl font-display font-semibold tracking-tight">
              ProResume
            </Link>
            <div className="mt-6 space-y-2">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm font-medium ${
                      isActive ? "bg-ink text-white" : "text-ink/70 hover:bg-ink/10"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink to="/admin" className="block rounded-lg px-3 py-2 text-sm text-ink/50">
                Admin
              </NavLink>
            </div>
          </div>
        </aside>

        <main className="px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
