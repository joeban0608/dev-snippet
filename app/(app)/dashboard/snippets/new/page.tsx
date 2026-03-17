import Link from "next/link";

import { SnippetForm } from "@/components/snippets/snippet-form";
import { requireUser } from "@/lib/auth/auth";
import { createSnippetAction } from "@/lib/snippets/actions";

export default async function NewSnippetPage() {
  await requireUser();

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3">
        <Link className="muted text-sm font-medium" href="/dashboard">
          Back to dashboard
        </Link>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            Create
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Add a new snippet
          </h1>
        </div>
      </div>

      <SnippetForm
        action={createSnippetAction}
        submitLabel="Create snippet"
      />
    </section>
  );
}
