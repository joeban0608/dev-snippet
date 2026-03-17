import Link from "next/link";
import { notFound } from "next/navigation";

import { SnippetForm } from "@/components/snippets/snippet-form";
import { requireUser } from "@/lib/auth/auth";
import { deleteSnippetAction, updateSnippetAction } from "@/lib/snippets/actions";
import { getOwnedSnippetById } from "@/lib/snippets/queries";

export default async function EditSnippetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const snippet = await getOwnedSnippetById(id, user.id);

  if (!snippet) {
    notFound();
  }

  const boundUpdateAction = updateSnippetAction.bind(null, id);
  const boundDeleteAction = deleteSnippetAction.bind(null, id);

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <Link className="muted text-sm font-medium" href="/dashboard">
            Back to dashboard
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Edit
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {snippet.title}
            </h1>
          </div>
        </div>

        <form action={boundDeleteAction}>
          <button className="button-danger" type="submit">
            Delete snippet
          </button>
        </form>
      </div>

      <SnippetForm
        action={boundUpdateAction}
        initialValues={snippet}
        submitLabel="Save changes"
      />
    </section>
  );
}
