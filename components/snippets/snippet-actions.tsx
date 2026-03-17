import Link from "next/link";

import { deleteSnippetAction } from "@/lib/snippets/actions";

type SnippetActionsProps = {
  snippetId: string;
};

export function SnippetActions({ snippetId }: SnippetActionsProps) {
  const boundDeleteAction = deleteSnippetAction.bind(null, snippetId);

  return (
    <div className="flex items-center gap-3">
      <Link className="button-secondary" href={`/dashboard/snippets/${snippetId}`}>
        Edit
      </Link>
      <form action={boundDeleteAction}>
        <button className="button-danger" type="submit">
          Delete
        </button>
      </form>
    </div>
  );
}
