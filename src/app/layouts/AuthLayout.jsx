import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="mx-auto flex min-h-screen max-w-5xl items-center justify-center px-6">
        <div className="grid w-full gap-10 lg:grid-cols-[1.1fr,1fr]">
          <div className="hidden flex-col justify-center lg:flex">
            <div className="rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-soft">
              <div className="text-xs uppercase tracking-[0.25em] text-ink/50">ProResume Studio</div>
              <h1 className="mt-4 text-3xl font-semibold">Design resumes recruiters love.</h1>
              <p className="mt-3 text-sm text-ink/60">
                Build ATS-optimized resumes with live preview, version history, and clean templates.
              </p>
            </div>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-white p-8 shadow-soft">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
