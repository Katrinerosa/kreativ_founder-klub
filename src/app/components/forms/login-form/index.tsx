"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoading(false);
      setMessage("E-mail eller adgangskode er forkert.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#231651]" htmlFor="email">
          E-mail
        </label>
        <input
          className="w-full rounded-xl border border-[#d8dbea] bg-white px-4 py-3 text-[#231651] outline-none transition focus:border-[#6491de] focus:ring-4 focus:ring-[#6491de]/15"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="navn@eksempel.dk"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[#231651]" htmlFor="password">
          Adgangskode
        </label>
        <input
          className="w-full rounded-xl border border-[#d8dbea] bg-white px-4 py-3 text-[#231651] outline-none transition focus:border-[#6491de] focus:ring-4 focus:ring-[#6491de]/15"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>

      <button
        className="w-full rounded-xl bg-[#231651] px-4 py-3 font-semibold text-white transition hover:bg-[#382875] disabled:cursor-not-allowed disabled:opacity-60"
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
