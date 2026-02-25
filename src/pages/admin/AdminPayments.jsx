export default function AdminPayments() {
  return (
    <div>
      <h1 className="text-2xl font-display font-semibold">Payments</h1>
      <div className="mt-6 card p-6 text-sm">
        <div className="flex items-center justify-between py-2">
          <span>Order #1241</span>
          <span className="text-ink/50">₹399</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span>Order #1242</span>
          <span className="text-ink/50">₹2499</span>
        </div>
      </div>
    </div>
  );
}
