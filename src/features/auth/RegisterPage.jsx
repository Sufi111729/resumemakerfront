import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { authApi } from "../../api/authApi";
import { uiStore } from "../../state/uiStore";
import { useState } from "react";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  emailCode: z.string().min(4, "Enter code"),
  password: z.string().min(6)
});

export function RegisterPage() {
  const navigate = useNavigate();
  const { pushToast } = uiStore();
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema) });

  const handleSendCode = async () => {
    const email = getValues("email");
    if (!email) {
      pushToast({ title: "Email required", message: "Enter your email first." });
      return;
    }
    try {
      setSending(true);
      await authApi.sendEmailCode({ email });
      pushToast({ title: "Code sent", message: "Check your inbox." });
    } catch (err) {
      pushToast({ title: "Send failed", message: err.message || "Try again" });
    } finally {
      setSending(false);
    }
  };

  const onSubmit = async (values) => {
    try {
      await authApi.register(values);
      pushToast({ title: "Account created", message: "Please log in." });
      navigate("/login");
    } catch (err) {
      pushToast({ title: "Registration failed", message: err.message || "Try again" });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Create your account</h2>
      <p className="mt-2 text-sm text-ink/60">Start building your resume in minutes.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-xs uppercase tracking-widest text-ink/50">First Name</label>
            <Input {...register("firstName")} />
            {errors.firstName ? <p className="text-xs text-red-500">{errors.firstName.message}</p> : null}
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-ink/50">Last Name</label>
            <Input {...register("lastName")} />
            {errors.lastName ? <p className="text-xs text-red-500">{errors.lastName.message}</p> : null}
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-ink/50">Email</label>
          <Input type="email" {...register("email")} />
          {errors.email ? <p className="text-xs text-red-500">{errors.email.message}</p> : null}
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <div>
            <label className="text-xs uppercase tracking-widest text-ink/50">Email Code</label>
            <Input {...register("emailCode")} placeholder="Enter code" />
            {errors.emailCode ? <p className="text-xs text-red-500">{errors.emailCode.message}</p> : null}
          </div>
          <div className="flex items-end">
            <Button type="button" variant="secondary" onClick={handleSendCode} disabled={sending}>
              {sending ? "Sending..." : "Send Code"}
            </Button>
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-ink/50">Mobile</label>
          <Input {...register("phone")} />
          {errors.phone ? <p className="text-xs text-red-500">{errors.phone.message}</p> : null}
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-ink/50">Password</label>
          <Input type="password" {...register("password")} />
          {errors.password ? <p className="text-xs text-red-500">{errors.password.message}</p> : null}
        </div>
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create account"}
        </Button>
      </form>

      <div className="mt-4 text-sm text-ink/60">
        Already have an account? <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
}
