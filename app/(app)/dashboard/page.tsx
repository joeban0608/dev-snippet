import Link from "next/link";

import { EmptyState } from "@/components/dashboard/empty-state";
import { SnippetList } from "@/components/snippets/snippet-list";
import { requireUser } from "@/lib/auth/auth";
import { listSnippetsByUser } from "@/lib/snippets/queries";

export default async function DashboardPage() {
  const user = await requireUser();
  const snippets = await listSnippetsByUser(user.id);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-[1.75rem] border border-border bg-surface-strong px-6 py-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Your private snippet workspace
          </h1>
          <p className="muted mt-2 max-w-2xl leading-7">
            Every snippet is scoped to your account. Creation, editing, and
            deletion all run through server actions with ownership checks.
          </p>
        </div>

        <Link className="button-primary" href="/dashboard/snippets/new">
          New snippet
        </Link>
      </div>

      {snippets.length === 0 ? (
        <EmptyState />
      ) : (
        <SnippetList snippets={snippets} />
      )}
    </section>
  );
}
