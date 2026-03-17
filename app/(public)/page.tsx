import Link from "next/link";
import { redirect } from "next/navigation";

import { SignInButton } from "@/components/auth/sign-in-button";
import { auth } from "@/lib/auth/auth";

export default async function LandingPage() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <main className="page-shell grain overflow-hidden py-8">
      <div className="container">
        <section className="panel relative overflow-hidden rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
          <div className="absolute right-[-8rem] top-[-7rem] h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(187,90,42,0.28),_transparent_65%)]" />
          <div className="absolute bottom-[-6rem] left-[-5rem] h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(81,64,39,0.18),_transparent_68%)]" />

          <div className="relative flex min-h-[78vh] flex-col justify-between gap-16">
            <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                  Dev Snippet Manager
                </p>
                <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
                  Build a real OAuth workflow, not just a login button demo.
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <Link className="button-secondary" href="/login">
                  View login
                </Link>
                <SignInButton className="button-primary" />
              </div>
            </header>

            <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
              <div className="rounded-[1.75rem] border border-border bg-[rgba(255,251,244,0.75)] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
                  What this app practices
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    "GitHub OAuth with Auth.js v5",
                    "Database-backed sessions",
                    "Protected App Router routes",
                    "Server-side ownership enforcement",
                    "Drizzle ORM and PostgreSQL",
                    "Zod validation in server actions",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-3xl border border-border bg-white/65 p-4"
                    >
                      <p className="font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="rounded-[1.75rem] bg-[#211b18] p-6 text-[#f8efe4] shadow-[0_20px_60px_rgba(33,27,24,0.24)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ffb68d]">
                  MVP focus
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[#eadbcf]">
                  <li>GitHub login/logout</li>
                  <li>Protected dashboard</li>
                  <li>User-owned snippet CRUD</li>
                  <li>No tags, search, admin, or sharing yet</li>
                </ul>
                <div className="mt-8 rounded-[1.5rem] bg-white/8 p-4">
                  <p className="text-sm text-[#f4dfcd]">
                    Keep the app narrow. The portfolio story is stronger when
                    auth, session, and authorization are obviously real.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
