export default function ForgotPassword() {
  return (
    <div className="min-h-screen grid place-items-center bg-cream">
      <div className="card p-8 w-[380px]">
        <h1 className="text-xl font-display font-semibold">Reset password</h1>
        <p className="mt-2 text-sm text-ink/60">We will email you a reset link.</p>
        <input className="input mt-5" placeholder="Email" />
        <button className="mt-6 w-full rounded-2xl bg-ink px-4 py-2 text-sm text-white">
          Send link
        </button>
      </div>
    </div>
  );
}
