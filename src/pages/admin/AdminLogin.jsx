import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { authStore } from "../../state/authStore";
import { uiStore } from "../../state/uiStore";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setTokens, setUser } = authStore();
  const { pushToast } = uiStore();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(
      z.object({ email: z.string().email(), password: z.string().min(8) })
    ),
    defaultValues: { email: "admin@proresume.com", password: "" }
  });

  const onSubmit = async (values) => {
    try {
      const res = await authApi.login(values);
      const { accessToken, refreshToken, user } = res.data;
      setTokens(accessToken, refreshToken);
      setUser(user || { email: values.email, role: "ADMIN" });
      navigate("/admin/users");
    } catch (err) {
      pushToast({ title: "Admin login failed", message: err.message || "Invalid credentials" });
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-haze">
      <form onSubmit={handleSubmit(onSubmit)} className="card p-8 w-[380px]">
        <h1 className="text-xl font-display font-semibold">Admin Sign In</h1>
        <p className="text-sm text-ink/70 mt-2">Admin access only.</p>

        <div className="mt-6 space-y-3">
          <input className="input" placeholder="Email" {...register("email")} />
          <input type="password" className="input" placeholder="Password" {...register("password")} />
        </div>
        <button
          type="submit"
          className="mt-5 w-full bg-ink text-white rounded-lg py-2"
          disabled={formState.isSubmitting}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
