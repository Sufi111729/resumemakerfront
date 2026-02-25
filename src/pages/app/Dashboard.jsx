import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

export default function Dashboard() {
  const navigate = useNavigate();
  const clear = useAuthStore((s) => s.clear);
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-semibold">Studio</h1>
          <p className="mt-2 text-sm text-ink/70">Design, iterate, and ship ATS‑clean resumes.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-2xl bg-ink px-5 py-2 text-sm text-white">New Resume</button>
          <button
            className="rounded-2xl border border-ink/20 px-5 py-2 text-sm"
            onClick={() => {
              clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-5">
        {[
          { label: "Resumes", value: "4" },
          { label: "Exports", value: "12" },
          { label: "Views", value: "1.2k" },
          { label: "Conversion", value: "3.8%" }
        ].map((card) => (
          <div key={card.label} className="card p-5">
            <div className="text-xs uppercase tracking-widest text-ink/50">{card.label}</div>
            <div className="mt-3 text-2xl font-display font-semibold">{card.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
