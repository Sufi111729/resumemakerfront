export default function Settings() {
  return (
    <div>
      <h1 className="text-3xl font-display font-semibold">Settings</h1>
      <div className="mt-6 card p-6">
        <div className="label">Profile</div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <input className="input" placeholder="Full name" />
          <input className="input" placeholder="Title" />
        </div>
        <button className="mt-6 rounded-2xl bg-ink px-4 py-2 text-sm text-white">Save</button>
      </div>
    </div>
  );
}
