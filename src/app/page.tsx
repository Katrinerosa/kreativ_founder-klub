import Link from "next/link";
import WolfHero from "./components/home/wolf-hero";
import ClubChatDemo from "./components/home/club-chat-demo";

const benefits = [
  {
    number: "01",
    title: "Ærlige samtaler",
    text: "Del både sejre, tvivl og de ufærdige idéer med mennesker, der forstår livet som kreativ founder.",
  },
  {
    number: "02",
    title: "Fælles fremdrift",
    text: "Få sparring, nye perspektiver og et kærligt skub, når du sidder fast i din forretning eller proces.",
  },
  {
    number: "03",
    title: "Plads til dit tempo",
    text: "Et fællesskab uden hustle-kultur. Vi tror på bæredygtige ambitioner, pauser og arbejde med mening.",
  },
];

const events = [
  {
    date: "14. nov.",
    type: "Online session",
    title: "Fra idémylder til én tydelig retning",
    detail: "09.00–10.15 · Fokus & sparring",
  },
  {
    date: "28. nov.",
    type: "Klubaften",
    title: "Vis dit arbejde — også før det er perfekt",
    detail: "19.00–21.00 · København",
  },
  {
    date: "05. dec.",
    type: "Co-working",
    title: "Årets sidste stille arbejdsrum",
    detail: "10.00–13.00 · Online",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[var(--cream)] text-[var(--ink)]">
      <section className="relative isolate border-b border-[var(--ink)]/15 px-5 pb-12 pt-14 sm:px-8 lg:px-12 lg:pb-16 lg:pt-20">
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <p className="eyebrow mb-7">Et fællesskab for kreative founders</p>
            <h1 className="font-display text-[clamp(4.4rem,10vw,9.4rem)] leading-[0.78] tracking-[-0.075em]">
              Skab stort.
              <span className="mt-4 block pl-[0.14em] text-[var(--blue)]">Stå sammen.</span>
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
              Kreativ Founder Klub samler kreative selvstændige til ærlig sparring,
              fælles arbejdsdage og et netværk, der hjælper idéer videre.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a className="button-primary !bg-[var(--lime)] !text-[var(--ink)]" href="#klubben">
                Se hvad du får
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <WolfHero />
        </div>

        <div className="relative mx-auto mt-10 flex max-w-7xl flex-wrap gap-x-10 gap-y-3 border-t border-[var(--ink)]/20 pt-6 text-sm font-semibold text-[var(--muted)]">
          <span>Sparring</span>
          <span>Fælles arbejdsdage</span>
          <span>Netværk</span>
        </div>
      </section>

      <section id="klubben" className="px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="eyebrow">Ikke endnu et netværk</p>
              <p className="mt-7 max-w-sm text-lg leading-8 text-[var(--muted)]">
                Mindre smalltalk. Mere ærlighed, nærvær og konkrete skridt fremad.
              </p>
            </div>
            <h2 className="font-display max-w-4xl text-[clamp(3.2rem,6vw,6.6rem)] leading-[0.92] tracking-[-0.055em]">
              Et sted at tænke højt, finde mod og gøre idéer virkelige.
            </h2>
          </div>

          <div className="mt-20 grid border-y border-[var(--ink)]/25 md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                className="group border-b border-[var(--ink)]/25 py-9 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                key={benefit.number}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-[var(--blue)]">{benefit.number}</span>
                  <span className="grid size-10 place-items-center rounded-full border border-[var(--ink)] transition group-hover:rotate-12 group-hover:bg-[var(--lime)]">+</span>
                </div>
                <h3 className="font-display mt-16 text-3xl tracking-[-0.03em]">{benefit.title}</h3>
                <p className="mt-5 max-w-sm leading-7 text-[var(--muted)]">{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ClubChatDemo />

      <section className="bg-[var(--ink)] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow !text-[var(--lime)]">Mød klubben</p>
            <h2 className="font-display mt-7 text-[clamp(3.5rem,6vw,6.7rem)] leading-[0.9] tracking-[-0.055em]">
              Kalenderen er vores fælles puls.
            </h2>
            <p className="mt-8 max-w-md text-lg leading-8 text-white/65">
              Samlinger, fokustid og sparring, der hjælper dig videre — uden at fylde
              kalenderen bare for at fylde den.
            </p>
          </div>

          <div className="border-t border-white/25">
            {events.map((event) => (
              <article
                className="group grid gap-5 border-b border-white/25 py-8 sm:grid-cols-[110px_1fr_auto] sm:items-center"
                key={event.title}
              >
                <p className="font-mono text-sm text-[var(--lime)]">{event.date}</p>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">{event.type}</p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{event.title}</h3>
                  <p className="mt-2 text-sm text-white/55">{event.detail}</p>
                </div>
                <span className="grid size-12 place-items-center rounded-full border border-white/35 text-xl transition group-hover:-rotate-12 group-hover:border-[var(--lime)] group-hover:bg-[var(--lime)] group-hover:text-[var(--ink)]">↗</span>
              </article>
            ))}
            <p className="mt-5 text-xs text-white/45">Eksempler på klubformat og arrangementer.</p>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border-2 border-[var(--ink)] bg-[var(--blue)] px-6 py-16 text-white shadow-[10px_10px_0_var(--ink)] sm:px-12 lg:px-20 lg:py-24">
          <div className="relative z-10 max-w-4xl">
            <p className="eyebrow !text-white/75">Er der plads til dig?</p>
            <h2 className="font-display mt-7 text-[clamp(3.4rem,7vw,7.5rem)] leading-[0.86] tracking-[-0.06em]">
              Din idé fortjener godt selskab.
            </h2>
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center">
              <Link className="button-primary !bg-[var(--lime)] !text-[var(--ink)]" href="/signup">
                Opret din konto
                <span aria-hidden="true">↗</span>
              </Link>
              <p className="max-w-xs text-sm leading-6 text-white/70">
                Konceptprojekt — oprettelse og login er allerede bygget med Supabase.
              </p>
            </div>
          </div>
          <div className="absolute -bottom-24 -right-24 size-80 rounded-full border-[55px] border-[var(--pink)] opacity-85" aria-hidden="true" />
        </div>
      </section>
    </main>
  );
}
