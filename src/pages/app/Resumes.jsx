import { Link } from "react-router-dom";

export default function Resumes() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-semibold">Resumes</h1>
        <Link to="/app/resume/1/editor" className="rounded-2xl bg-ink px-5 py-2 text-sm text-white">
          Create
        </Link>
      </div>
      <div className="mt-6 grid gap-4">
        {["Backend Engineer", "Product Designer"].map((title) => (
          <div key={title} className="card p-5 flex items-center justify-between">
            <div>
              <div className="font-semibold">{title}</div>
              <div className="text-xs text-ink/60">Updated 2 hours ago</div>
            </div>
            <Link to="/app/resume/1/editor" className="text-sm underline">
              Open
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
