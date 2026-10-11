"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { LoginInput, loginSchema } from "@/src/lib/validation";

type FieldErrors = Partial<Record<keyof LoginInput, string>>;

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const result = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!result.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginInput;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }
      setErrors(nextErrors);
      setMessage("Tjek de markerede felter.");
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(result.data);

    if (error) {
      setLoading(false);
      setMessage("E-mail eller adgangskode er forkert.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="email">
          E-mail
        </label>
        <input
          aria-describedby={errors.email ? "login-email-error" : undefined}
          aria-invalid={Boolean(errors.email)}
          className="w-full rounded-xl border-2 border-[var(--border)] bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--blue)] focus:ring-4 focus:ring-blue-200/50"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="navn@eksempel.dk"
        />
        {errors.email && <p className="text-xs text-red-700" id="login-email-error">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="password">
          Adgangskode
        </label>
        <input
          aria-describedby={errors.password ? "login-password-error" : undefined}
          aria-invalid={Boolean(errors.password)}
          className="w-full rounded-xl border-2 border-[var(--border)] bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--blue)] focus:ring-4 focus:ring-blue-200/50"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        {errors.password && <p className="text-xs text-red-700" id="login-password-error">{errors.password}</p>}
      </div>

      <button
        className="w-full rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] px-4 py-3 font-semibold text-white transition hover:bg-[var(--blue)] disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        {loading ? "Logger ind…" : "Log ind"}
      </button>

      {message && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {message}
        </p>
      )}
    </form>
  );
}
