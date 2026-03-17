import { SignOutButton } from "@/components/auth/sign-out-button";
import type { SessionUser } from "@/types/auth";

type DashboardHeaderProps = {
  user: SessionUser;
};

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const label = user.name?.trim() || user.email || "Developer";
  const initial = label.charAt(0).toUpperCase();

  return (
    <header className="flex flex-col gap-4 rounded-[1.75rem] border border-border bg-[rgba(255,251,245,0.82)] px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[rgba(187,90,42,0.12)] text-lg font-semibold text-accent">
          {initial}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Signed in
          </p>
          <p className="mt-1 text-lg font-semibold">{label}</p>
          {user.email ? <p className="muted text-sm">{user.email}</p> : null}
        </div>
      </div>

      <SignOutButton />
    </header>
  );
}
