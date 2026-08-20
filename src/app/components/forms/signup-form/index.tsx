"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";

export default function SignupForm() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setIsError(true);
      setMessage(error.message);
      return;
    }

    form.reset();
    setMessage("Tjek din e-mail for at bekræfte din konto.");
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
          autoComplete="new-password"
          minLength={8}
          required
        />
        <p className="text-xs text-[#655f78]">Mindst 8 tegn.</p>
      </div>

      <button
        className="w-full rounded-xl bg-[#231651] px-4 py-3 font-semibold text-white transition hover:bg-[#382875] disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        {loading ? "Opretter…" : "Opret konto"}
      </button>

      {message && (
        <p
          className={`rounded-xl px-4 py-3 text-sm ${
            isError
              ? "bg-red-50 text-red-700"
              : "bg-emerald-50 text-emerald-800"
          }`}
          role={isError ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </form>
  );
}
