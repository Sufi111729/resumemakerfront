import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { uiStore } from "../../state/uiStore";

const schema = z.object({ email: z.string().email() });

export function ForgotPasswordPage() {
  const { pushToast } = uiStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async () => {
    pushToast({ title: "Reset sent", message: "Check your email." });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Forgot password</h2>
      <p className="mt-2 text-sm text-ink/60">We will send you a reset link.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-xs uppercase tracking-widest text-ink/50">Email</label>
          <Input type="email" {...register("email")} />
          {errors.email ? <p className="text-xs text-red-500">{errors.email.message}</p> : null}
        </div>
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send reset"}
        </Button>
      </form>

      <div className="mt-4 text-sm text-ink/60">
        Back to <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
}
