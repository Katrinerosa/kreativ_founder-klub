import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";

export const metadata = {
  title: "Dashboard | Kreativ Founder Klub",
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

  return (
    <main className="flex-1 bg-[#f8f9fc] px-5 py-12 text-[#231651]">
      <section className="mx-auto max-w-4xl rounded-3xl border border-[#e5e7eb] bg-white p-7 shadow-[0_24px_70px_rgba(35,22,81,0.08)] sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6491de]">
              Kreativ Founder Klub
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">Dit dashboard</h1>
            <p className="mt-3 text-[#655f78]">
              Du er logget ind som {user.email}.
            </p>
          </div>

          <form action={signOut}>
            <button
              className="rounded-xl border border-[#d8dbea] px-5 py-3 font-semibold transition hover:border-[#6491de] hover:bg-[#f3f6fc]"
              type="submit"
            >
              Log ud
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
