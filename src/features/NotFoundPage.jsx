import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream text-ink">
      <div className="text-center">
        <div className="text-5xl font-semibold">404</div>
        <p className="mt-2 text-sm text-ink/60">Page not found</p>
        <Link to="/">
          <Button className="mt-4">Back home</Button>
        </Link>
      </div>
    </div>
  );
}
