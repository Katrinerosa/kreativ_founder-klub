import Image from "next/image";
import Link from "next/link";

export default function WolfHero() {
  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="relative aspect-square w-full">
        <div
          className="absolute inset-[10%] z-10 rotate-3 rounded-[42%_58%_51%_49%/54%_40%_60%_46%] bg-[var(--lime)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-[15%] z-20 -rotate-6 rounded-[55%_45%_37%_63%/48%_57%_43%_52%] border-2 border-[var(--ink)] bg-[var(--pink)]"
          aria-hidden="true"
        />
        <Image
          className="relative z-30 h-full w-full object-contain p-[18%] drop-shadow-[0_28px_30px_rgba(21,30,58,0.18)]"
          src="/wolfiefavicon.png"
          alt="Klubbens blå ulvemaskot"
          fill
          sizes="(max-width: 1024px) 90vw, 45vw"
          priority
        />
        <Link
          aria-label="Bliv medlem af Kreativ Founder Klub"
          className="absolute bottom-[3%] right-[1%] z-40 max-w-44 -rotate-3 rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] px-5 py-3 text-center text-sm font-extrabold leading-4 text-[var(--ink)] shadow-[6px_6px_0_var(--ink)] transition hover:-translate-y-1 hover:shadow-[8px_8px_0_var(--blue)]"
          href="/signup"
        >
          Du behøver ikke<br />bygge alene
        </Link>
      </div>
    </div>
  );
}
