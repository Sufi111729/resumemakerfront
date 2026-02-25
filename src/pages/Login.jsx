import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
  const navigate = useNavigate();
  const setTokens = useAuthStore((s) => s.setTokens);
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(
      z.object({ email: z.string().email(), password: z.string().min(8) })
    ),
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (values) => {
    const tokens = await login(values);
    setTokens({ ...tokens, role: "USER" });
    navigate("/app/dashboard");
  };

  return (
    <div className="min-h-screen grid place-items-center bg-cream">
      <form onSubmit={handleSubmit(onSubmit)} className="card p-8 w-[360px]">
        <h1 className="text-xl font-display font-semibold">Sign in</h1>
        <p className="text-sm text-ink/70 mt-2">Access your resumes and exports.</p>

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
