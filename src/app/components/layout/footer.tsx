import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#e5e7eb] bg-white text-[#655f78]">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-7 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Kreativ Founder Klub</p>
        <nav aria-label="Footer-navigation">
          <ul className="flex gap-5">
            <li>
              <Link className="transition hover:text-[#231651]" href="/login">
                Log ind
              </Link>
            </li>
            <li>
              <Link className="transition hover:text-[#231651]" href="/signup">
                Opret konto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
