export default function AdminUsers() {
  return (
    <div>
      <h1 className="text-2xl font-display font-semibold">Users</h1>
      <div className="mt-6 card p-6">
        {["a@demo.com", "b@demo.com", "c@demo.com"].map((u) => (
          <div key={u} className="flex items-center justify-between py-2 text-sm">
            <span>{u}</span>
            <span className="text-ink/50">FREE</span>
          </div>
        ))}
      </div>
    </div>
  );
}
