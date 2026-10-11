"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PawMark from "../ui/paw-mark";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--ink)]/15 bg-[var(--cream)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
        <Link className="flex items-center gap-3" href="/">
          <Image
            className="size-11 object-contain"
            src="/wolfiefavicon.png"
            alt="Kreativ Founder Klub"
            width={44}
            height={44}
            priority
          />
          <span className="hidden max-w-28 text-sm font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-[var(--ink)] sm:inline">
            Kreativ<br />Founder Klub
          </span>
        </Link>

        <nav aria-label="Primær navigation">
          <ul className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)] sm:gap-5">
            <li className="hidden md:block">
              <Link
                className="group inline-flex items-center gap-2 transition hover:text-[var(--blue)]"
                href="/#klubben"
              >
                <PawMark
                  className={`size-3.5 transition ${pathname === "/" ? "text-[var(--blue)]" : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"}`}
                />
                Om klubben
              </Link>
            </li>
            <li className="hidden lg:block">
              <Link
                className="group inline-flex items-center gap-2 transition hover:text-[var(--blue)]"
                href="/#chatdemo"
              >
                <PawMark className="size-3.5 scale-75 opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
                Chatdemo
              </Link>
            </li>
            <li className="hidden sm:block">
              <Link
                className="group inline-flex items-center gap-2 transition hover:text-[var(--blue)]"
                href="/dashboard"
              >
                <PawMark
                  className={`size-3.5 transition ${pathname === "/dashboard" ? "text-[var(--blue)]" : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"}`}
                />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="group inline-flex items-center gap-2 px-3 py-2 transition hover:text-[var(--blue)]"
                href="/login"
              >
                <PawMark
                  className={`size-3.5 transition ${pathname === "/login" ? "text-[var(--blue)]" : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"}`}
                />
                Log ind
              </Link>
            </li>
            <li>
              <Link
                className="rounded-full border-2 border-[var(--ink)] bg-[var(--lime)] px-4 py-2.5 text-[var(--ink)] transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)]"
                href="/signup"
              >
                Bliv medlem
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
