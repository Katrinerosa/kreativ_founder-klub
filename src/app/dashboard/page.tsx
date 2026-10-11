import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  async function signOut() {
    "use server";

    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  const memberName = user.email?.split("@")[0] || "Medlem";

  return (
    <main className="flex-1 bg-[var(--cream)] px-5 py-12 text-[var(--ink)] sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-[2rem] border-2 border-[var(--ink)] bg-[var(--paper)] p-7 shadow-[8px_8px_0_var(--blue)] sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--blue)]">
              Kreativ Founder Klub
            </p>
            <h1 className="font-display mt-3 text-4xl tracking-[-0.04em]">Dit dashboard</h1>
            <p className="mt-3 text-[var(--muted)]">
              Velkommen, {memberName}. Her mødes idéer og mennesker.
            </p>
          </div>

          <form action={signOut}>
            <button
              className="rounded-full border-2 border-[var(--ink)] bg-[var(--lime)] px-5 py-3 font-semibold transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)]"
              type="submit"
            >
              Log ud
            </button>
          </form>
        </div>
        </section>

        <div className="mt-10 max-w-md">
          <aside className="rounded-[2rem] border-2 border-[var(--ink)] bg-[var(--lime)] p-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--blue)]">Næste i klubben</p>
            <p className="font-display mt-5 text-3xl leading-tight tracking-[-0.035em]">Fælles arbejdsdag</p>
            <p className="mt-4 leading-7 text-[var(--muted)]">Torsdag kl. 09.00–13.00<br />Online fokusrum</p>
            <button className="mt-8 w-full rounded-full border-2 border-[var(--ink)] bg-[var(--paper)] px-5 py-3 font-bold transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--ink)]" type="button">
              Gem plads
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
}
