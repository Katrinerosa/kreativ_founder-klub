import Link from "next/link";
import LoginForm from "../components/forms/login-form";

export const metadata = {
  title: "Log ind",
};

export default function LoginPage() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-[var(--cream)] px-5 py-16">
      <div className="absolute -left-32 top-10 size-80 rounded-full bg-[var(--pink)]/65" aria-hidden="true" />
      <div className="absolute -right-28 bottom-0 size-72 rounded-full bg-[var(--lime)]/80" aria-hidden="true" />
      <section className="relative w-full max-w-md rounded-[2rem] border-2 border-[var(--ink)] bg-[var(--paper)] p-7 shadow-[8px_8px_0_var(--blue)] sm:p-10">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--blue)]">
            Kreativ Founder Klub
          </p>
          <h1 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
            Velkommen tilbage
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Log ind for at fortsætte til klubben.
          </p>
        </div>

        <LoginForm />

        <p className="mt-7 text-center text-sm text-[var(--muted)]">
          Har du ikke en konto?{" "}
          <Link className="font-semibold text-[var(--blue)] hover:underline" href="/signup">
            Opret konto
          </Link>
        </p>
      </section>
    </main>
  );
}
