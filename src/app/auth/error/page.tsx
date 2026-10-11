import Link from "next/link";

export const metadata = {
  title: "Bekræftelse mislykkedes",
};

export default function AuthErrorPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[var(--cream)] px-5 py-16 text-[var(--ink)]">
      <section className="w-full max-w-lg rounded-[2rem] border-2 border-[var(--ink)] bg-[var(--paper)] p-8 text-center shadow-[8px_8px_0_var(--pink)] sm:p-10">
        <p className="eyebrow">Bekræftelseslink</p>
        <h1 className="font-display mt-5 text-4xl tracking-[-0.04em]">Linket kunne ikke bruges</h1>
        <p className="mt-5 leading-7 text-[var(--muted)]">
          Linket kan være udløbet eller allerede brugt. Opret kontoen igen, eller log ind, hvis din e-mail allerede er bekræftet.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link className="button-primary" href="/signup">Prøv igen <span aria-hidden="true">↗</span></Link>
          <Link className="button-link" href="/login">Gå til login <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </main>
  );
}
