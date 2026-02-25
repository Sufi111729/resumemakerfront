import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { register as registerApi } from "../api/auth";
import http from "../api/http";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  emailCode: z.string().min(4),
  phone: z.string().min(8),
  password: z.string().min(8)
});

export default function Register() {
  const navigate = useNavigate();
  const [codeSent, setCodeSent] = useState(false);
  const { register, handleSubmit, formState, getValues } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values) => {
    await registerApi(values);
    navigate("/login");
  };

  return (
    <div className="min-h-screen grid place-items-center bg-cream">
      <form onSubmit={handleSubmit(onSubmit)} className="card p-8 w-[380px]">
        <h1 className="text-xl font-display font-semibold">Create account</h1>
        <div className="mt-5 space-y-3">
          <input className="input" placeholder="First name" {...register("firstName")} />
          <input className="input" placeholder="Last name" {...register("lastName")} />
          <div className="space-y-2">
            <input className="input" placeholder="Email" {...register("email")} />
            <div className="flex gap-2">
              <input className="input" placeholder="Email code" {...register("emailCode")} />
              <button
                type="button"
                className="rounded-xl border border-ink/20 px-3 text-xs"
                onClick={async () => {
                  const email = getValues("email");
                  await http.post("/auth/send-email-code", { email });
                  setCodeSent(true);
                }}
              >
                {codeSent ? "Sent" : "Send Code"}
              </button>
            </div>
          </div>
          <input className="input" placeholder="Mobile number" {...register("phone")} />
          <input type="password" className="input" placeholder="Password" {...register("password")} />
        </div>
        <button className="mt-6 w-full rounded-2xl bg-ink px-4 py-2 text-sm text-white">
          Create account
        </button>
        {formState.errors.email && (
          <div className="mt-2 text-xs text-red-600">Enter a valid email.</div>
        )}
      </form>
    </div>
  );
}
