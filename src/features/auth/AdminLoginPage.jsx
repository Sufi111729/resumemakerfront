import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { authStore } from "../../state/authStore";
import { uiStore } from "../../state/uiStore";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { pushToast } = uiStore();
  const { setTokens, setUser } = authStore();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "admin@proresume.com", password: "" }
  });

  const onSubmit = async (values) => {
    try {
      const res = await authApi.login(values);
      const { accessToken, refreshToken, user } = res.data;
      if (user?.role !== "ADMIN") {
        pushToast({ title: "Access denied", message: "Admin account required" });
        return;
      }
      setTokens(accessToken, refreshToken);
      setUser(user);
      navigate("/admin/dashboard");
    } catch (err) {
      pushToast({ title: "Login failed", message: err.message || "Invalid credentials" });
    }
  };

  return (
    <div className="min-h-screen bg-cream text-ink grid place-items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl bg-white shadow-soft border border-ink/10 p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold">Admin Sign In</h1>
        <p className="mt-2 text-sm text-ink/60">Admin access only.</p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-ink/50">Email</label>
            <Input {...register("email")} />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-ink/50">Password</label>
            <Input type="password" {...register("password")} />
          </div>
        </div>
        <Button className="mt-6 w-full" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
