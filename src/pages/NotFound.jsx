import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-cream">
      <div className="card p-8 text-center">
        <div className="text-4xl font-display font-semibold">404</div>
        <div className="mt-2 text-sm text-ink/60">Page not found.</div>
        <Link to="/" className="mt-4 inline-block rounded-xl border border-ink/20 px-4 py-2 text-sm">
          Go home
        </Link>
      </div>
    </div>
  );
}
