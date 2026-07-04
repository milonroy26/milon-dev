"use client";

import { Button } from "@/components/ui/Button";
import { authApi } from "@/lib/api/authApi";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-md border border-border-light dark:border-border-dark bg-transparent px-4 py-2.5 text-sm outline-none focus:border-primary";

export default function LoginPage() {
  const router = useRouter();
  const { setSession } = useAuthStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const { admin, accessToken } = await authApi.login({
        email: String(form.get("email")),
        password: String(form.get("password")),
      });
      setSession(admin, accessToken);
      router.push("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section pt-32 flex justify-center">
      <div className="container-page max-w-sm">
        <h1 className="text-2xl font-display font-bold mb-8 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" type="email" required placeholder="Email" className={inputClass} />
          <input name="password" type="password" required placeholder="Password" className={inputClass} />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </Button>
        </form>
      </div>
    </section>
  );
}
