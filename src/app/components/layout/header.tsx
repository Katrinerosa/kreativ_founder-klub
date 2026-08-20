import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[#e5e7eb] bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Link className="flex items-center gap-3" href="/">
          <Image
            className="size-11 rounded-full object-cover"
            src="/Wulfrivfav.png"
            alt="Kreativ Founder Klub"
            width={44}
            height={44}
            priority
          />
          <span className="hidden font-bold tracking-tight text-[#231651] sm:inline">
            Kreativ Founder Klub
          </span>
        </Link>

        <nav aria-label="Primær navigation">
          <ul className="flex items-center gap-2 text-sm font-semibold text-[#231651] sm:gap-5">
            <li className="hidden md:block">
              <Link className="transition hover:text-[#4f78bd]" href="/">
                Forside
              </Link>
            </li>
            <li className="hidden sm:block">
              <Link className="transition hover:text-[#4f78bd]" href="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <Link className="px-3 py-2 transition hover:text-[#4f78bd]" href="/login">
                Log ind
              </Link>
            </li>
            <li>
              <Link
                className="rounded-xl bg-[#231651] px-4 py-2.5 text-white transition hover:bg-[#382875]"
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
