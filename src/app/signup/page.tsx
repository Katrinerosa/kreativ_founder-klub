import Link from "next/link";
import SignupForm from "../components/forms/signup-form";

export const metadata = {
  title: "Opret konto | Kreativ Founder Klub",
};

export default function SignupPage() {
  return (
    <main className="flex flex-1 items-center justify-center bg-[#f8f9fc] px-5 py-12">
      <section className="w-full max-w-md rounded-3xl border border-[#e5e7eb] bg-white p-7 shadow-[0_24px_70px_rgba(35,22,81,0.10)] sm:p-10">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#6491de]">
            Kreativ Founder Klub
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[#231651]">
            Opret din konto
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#655f78]">
            Bliv en del af fællesskabet for kreative founders.
          </p>
        </div>

        <SignupForm />

        <p className="mt-7 text-center text-sm text-[#655f78]">
          Har du allerede en konto?{" "}
          <Link className="font-semibold text-[#4f78bd] hover:underline" href="/login">
            Log ind
          </Link>
        </p>
      </section>
    </main>
  );
}
