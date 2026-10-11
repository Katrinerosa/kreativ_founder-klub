import Image from "next/image";
import Link from "next/link";
import PawMark from "../ui/paw-mark";

const navigation = [
  { label: "Om klubben", href: "/#klubben" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Log ind", href: "/login" },
  { label: "Opret konto", href: "/signup" },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-[var(--ink)] bg-[var(--ink)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
          <div>
            <Link className="inline-flex items-center gap-4" href="/">
              <span className="grid size-16 place-items-center rounded-full bg-[var(--cream)]">
                <Image
                  className="size-12 object-contain"
                  src="/wolfiefavicon.png"
                  alt=""
                  width={48}
                  height={48}
                />
              </span>
              <span className="text-sm font-extrabold uppercase leading-[1.05] tracking-[-0.02em]">
                Kreativ<br />Founder Klub
              </span>
            </Link>

            <h2 className="font-display mt-12 max-w-3xl text-[clamp(3rem,6vw,6.5rem)] leading-[0.88] tracking-[-0.055em]">
              Gode idéer vokser bedre sammen.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
              Et kreativt frirum for founders, selvstændige og idémagere, der vil
              skabe en forretning med personlighed og mening.
            </p>
            <Link
              className="mt-10 inline-flex min-w-56 items-center justify-between gap-6 rounded-full border-2 border-[var(--lime)] bg-[var(--lime)] px-6 py-4 font-bold text-[var(--ink)] transition hover:-translate-y-1 hover:shadow-[5px_5px_0_var(--pink)]"
              href="/signup"
            >
              Bliv medlem
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="grid content-end gap-12 sm:grid-cols-2 lg:grid-cols-1">
            <nav aria-label="Footer-navigation">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-[var(--lime)]">
                Find vej
              </p>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      className="inline-flex items-center gap-3 text-lg font-semibold text-white/75 transition hover:translate-x-1 hover:text-white"
                      href={item.href}
                    >
                      <PawMark className="size-4 text-[var(--pink)]" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="rounded-3xl border border-white/20 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--lime)]">
                Om projektet
              </p>
              <p className="mt-4 text-sm leading-6 text-white/60">
                Et konceptprojekt, der demonstrerer branding, responsivt webdesign og
                et medlemsflow bygget med Next.js og Supabase.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/20 pt-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kreativ Founder Klub</p>
          <p>Koncept, design og udvikling · Katrine Rosa Beck</p>
        </div>
      </div>
    </footer>
  );
}
