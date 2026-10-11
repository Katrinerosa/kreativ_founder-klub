"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import { SignupInput, signupSchema } from "@/src/lib/validation";

type FieldErrors = Partial<Record<keyof SignupInput, string>>;

const inputClassName =
  "w-full rounded-xl border-2 border-[var(--border)] bg-white px-4 py-3 text-[var(--ink)] outline-none transition focus:border-[var(--blue)] focus:ring-4 focus:ring-blue-200/50 aria-[invalid=true]:border-red-500 aria-[invalid=true]:bg-red-50/40 aria-[invalid=true]:focus:ring-red-100";

export default function SignupForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = signupSchema.safeParse({
      fullName: formData.get("fullName"),
      creativeRole: formData.get("creativeRole"),
      goal: formData.get("goal"),
      email: formData.get("email"),
      password: formData.get("password"),
      acceptedTerms: formData.get("acceptedTerms") === "on",
    });

    if (!result.success) {
      const nextErrors: FieldErrors = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof SignupInput;
        if (!nextErrors[field]) nextErrors[field] = issue.message;
      }

      setErrors(nextErrors);
      setIsError(true);
      setMessage(`Zod fandt ${result.error.issues.length} ${result.error.issues.length === 1 ? "fejl" : "fejl"}. Tjek de markerede felter.`);
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email: result.data.email,
      password: result.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
        data: {
          full_name: result.data.fullName,
          creative_role: result.data.creativeRole,
          membership_goal: result.data.goal,
        },
      },
    });

    setLoading(false);

    if (error) {
      setIsError(true);
      setMessage(error.message);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    form.reset();
    setMessage("Kontoen er oprettet. Åbn bekræftelsesmailen — linket sender dig direkte til medlemssiden.");
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <div className="flex items-start gap-3 rounded-2xl border-2 border-[var(--blue)] bg-blue-50 px-4 py-3.5 text-[var(--ink)] shadow-[3px_3px_0_var(--lime)]">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--blue)] font-bold text-white" aria-hidden="true">✓</span>
        <div>
          <p className="text-sm font-extrabold">Zod-validering er aktiv</p>
          <p className="mt-1 text-xs leading-5 text-[var(--muted)]">Tryk på knappen med tomme eller ugyldige felter for at se schemaet fange fejlene.</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="fullName">
            Navn
          </label>
          <input
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            aria-invalid={Boolean(errors.fullName)}
            autoComplete="name"
            className={inputClassName}
            id="fullName"
            name="fullName"
            placeholder="Dit navn"
            type="text"
          />
          {errors.fullName && <p className="text-xs text-red-700" id="fullName-error">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="creativeRole">
            Kreativ rolle
          </label>
          <input
            aria-describedby={errors.creativeRole ? "creativeRole-error" : undefined}
            aria-invalid={Boolean(errors.creativeRole)}
            className={inputClassName}
            id="creativeRole"
            name="creativeRole"
            placeholder="Fx designer"
            type="text"
          />
          {errors.creativeRole && <p className="text-xs text-red-700" id="creativeRole-error">{errors.creativeRole}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="email">
          E-mail
        </label>
        <input
          aria-describedby={errors.email ? "signup-email-error" : undefined}
          aria-invalid={Boolean(errors.email)}
          className={inputClassName}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="navn@eksempel.dk"
        />
        {errors.email && <p className="text-xs text-red-700" id="signup-email-error">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="password">
          Adgangskode
        </label>
        <input
          aria-describedby={errors.password ? "signup-password-error" : "password-help"}
          aria-invalid={Boolean(errors.password)}
          className={inputClassName}
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
        />
        {errors.password ? (
          <p className="text-xs text-red-700" id="signup-password-error">{errors.password}</p>
        ) : (
          <p className="text-xs text-[var(--muted)]" id="password-help">Mindst 8 tegn, ét bogstav og ét tal.</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="goal">
          Hvad vil du gerne rykke på?
        </label>
        <textarea
          aria-describedby={errors.goal ? "goal-error" : "goal-help"}
          aria-invalid={Boolean(errors.goal)}
          className={`${inputClassName} min-h-28 resize-y`}
          id="goal"
          maxLength={240}
          name="goal"
          placeholder="Fortæl kort om din idé eller næste udfordring…"
        />
        {errors.goal ? (
          <p className="text-xs text-red-700" id="goal-error">{errors.goal}</p>
        ) : (
          <p className="text-xs text-[var(--muted)]" id="goal-help">10–240 tegn. Gemmes som profiloplysning i demoen.</p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-6 text-[var(--muted)]">
          <input className="mt-1 size-4 accent-[var(--blue)]" name="acceptedTerms" type="checkbox" />
          <span>Jeg forstår, at dette er en portfolio-demo og ikke et aktivt medlemskab.</span>
        </label>
        {errors.acceptedTerms && <p className="mt-2 text-xs text-red-700">{errors.acceptedTerms}</p>}
      </div>

      <button
        className="w-full rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] px-4 py-3 font-semibold text-white transition hover:bg-[var(--blue)] disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        {loading ? "Validerer og opretter…" : "Valider med Zod og opret"}
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
