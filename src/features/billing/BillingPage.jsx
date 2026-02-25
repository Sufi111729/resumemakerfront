import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-sm text-ink/60">Manage your plan and invoices.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          { name: "Free", price: "₹0" },
          { name: "Pro Monthly", price: "₹299" },
          { name: "Lifetime", price: "₹1999" }
        ].map((plan) => (
          <Card key={plan.name} className="p-6">
            <div className="text-lg font-semibold">{plan.name}</div>
            <div className="mt-2 text-3xl font-semibold">{plan.price}</div>
            <Button className="mt-6 w-full">Upgrade</Button>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="text-lg font-semibold">Payment history</div>
        <div className="mt-4 text-sm text-ink/60">No invoices yet.</div>
      </Card>
    </div>
  );
}
