import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { authApi } from "../../api/authApi";
import { authStore } from "../../state/authStore";
import { uiStore } from "../../state/uiStore";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export function LoginPage() {
  const navigate = useNavigate();
  const { pushToast } = uiStore();
  const { setTokens, setUser } = authStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      const res = await authApi.login(values);
      const { accessToken, refreshToken, user } = res.data;
      setTokens(accessToken, refreshToken);
      setUser(user || { email: values.email, name: "User" });
      pushToast({ title: "Welcome back", message: "Login successful" });
      navigate("/app/dashboard");
    } catch (err) {
      pushToast({ title: "Login failed", message: err.message || "Invalid credentials" });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">Sign in</h2>
      <p className="mt-2 text-sm text-ink/60">Access your dashboard and resumes.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-xs uppercase tracking-widest text-ink/50">Email</label>
          <Input type="email" {...register("email")} />
          {errors.email ? <p className="text-xs text-red-500">{errors.email.message}</p> : null}
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-ink/50">Password</label>
          <Input type="password" {...register("password")} />
          {errors.password ? <p className="text-xs text-red-500">{errors.password.message}</p> : null}
        </div>
        <Button className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="mt-4 flex justify-between text-sm text-ink/60">
        <Link to="/forgot-password">Forgot password?</Link>
        <Link to="/register">Create account</Link>
      </div>
    </div>
  );
}
