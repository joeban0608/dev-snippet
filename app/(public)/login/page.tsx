import Link from "next/link";
import { redirect } from "next/navigation";

import { SignInButton } from "@/components/auth/sign-in-button";
import { auth } from "@/lib/auth/auth";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <main className="page-shell grain flex items-center py-8">
      <div className="container">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-border bg-surface/90 p-8 shadow-[0_30px_90px_rgba(80,56,30,0.16)]">
          <Link className="muted text-sm font-medium" href="/">
            Back to home
          </Link>

          <div className="mt-8 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-accent">
              Sign in
            </p>
            <h1 className="text-4xl font-semibold tracking-tight">
              Continue with GitHub or Google to manage your snippets.
            </h1>
            <p className="muted text-base leading-7">
              This MVP supports GitHub and Google OAuth. Session and ownership
              checks are enforced on the server.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            <SignInButton
              className="button-primary w-full"
              label="Continue with GitHub"
              provider="github"
            />
            <SignInButton
              className="button-secondary w-full"
              label="Continue with Google"
              provider="google"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
