import Link from "next/link";
import SignupForm from "../components/forms/signup-form";

export const metadata = {
  title: "Opret konto",
};

export default function SignupPage() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-[var(--cream)] px-5 py-16 sm:px-8 lg:px-12">
      <div className="absolute -left-32 top-10 size-80 rounded-full bg-[var(--pink)]/65" aria-hidden="true" />
      <div className="absolute -right-28 bottom-0 size-72 rounded-full bg-[var(--lime)]/80" aria-hidden="true" />
      <section className="relative grid w-full max-w-6xl overflow-hidden rounded-[2.25rem] border-2 border-[var(--ink)] bg-[var(--paper)] shadow-[10px_10px_0_var(--blue)] lg:grid-cols-[0.8fr_1.2fr]">
        <div className="bg-[var(--ink)] p-8 text-white sm:p-10 lg:p-12">
          <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--lime)]">Bliv medlem</p>
          <h1 className="font-display mt-6 text-[clamp(3rem,5vw,5rem)] leading-[0.9] tracking-[-0.055em]">Byg ikke alene.</h1>
          <p className="mt-7 max-w-md leading-7 text-white/70">Opret en demokonto og oplev det beskyttede medlemsområde. Du får samtidig vist et komplet Supabase Auth-flow.</p>

          <div className="mt-10 border-t border-white/25">
            {[
              ["01", "Ærlig sparring", "Få nye perspektiver på idéer og valg."],
              ["02", "Fælles arbejdsdage", "Skab fremdrift sammen med andre."],
              ["03", "Kreativt netværk", "Mød mennesker, der bygger på deres egen måde."],
            ].map(([number, title, text]) => (
              <div className="grid grid-cols-[36px_1fr] gap-3 border-b border-white/25 py-5" key={number}>
                <span className="font-mono text-xs text-[var(--lime)]">{number}</span>
                <div>
                  <h2 className="font-bold">{title}</h2>
                  <p className="mt-1 text-sm leading-6 text-white/60">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--lime)]/60 bg-[var(--lime)]/10 px-4 py-2 text-xs font-bold text-[var(--lime)]">
            <span className="size-2 rounded-full bg-[var(--lime)]" aria-hidden="true" />
            Zod-schema + Supabase Auth
          </div>
        </div>

        <div className="p-7 sm:p-10 lg:p-12">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--blue)]">Din medlemsprofil</p>
            <h2 className="font-display mt-3 text-4xl tracking-[-0.04em] text-[var(--ink)]">Opret din konto</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Felterne valideres, før oplysningerne sendes sikkert til Supabase.</p>
          </div>

          <SignupForm />

          <p className="mt-7 text-center text-sm text-[var(--muted)]">
            Har du allerede en konto?{" "}
            <Link className="font-semibold text-[var(--blue)] hover:underline" href="/login">Log ind</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
