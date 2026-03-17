import { SnippetActions } from "@/components/snippets/snippet-actions";
import type { SnippetListItem } from "@/types/snippet";

type SnippetCardProps = {
  snippet: SnippetListItem;
};

export function SnippetCard({ snippet }: SnippetCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-border bg-[rgba(255,252,248,0.84)] p-5">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight">
              {snippet.title}
            </h2>
            {snippet.language ? (
              <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {snippet.language}
              </span>
            ) : null}
          </div>

          {snippet.description ? (
            <p className="muted max-w-2xl leading-7">{snippet.description}</p>
          ) : null}

          <pre className="overflow-x-auto rounded-[1.25rem] bg-[#241d19] p-4 text-sm leading-7 text-[#f5e8dd]">
            <code>{snippet.content}</code>
          </pre>
        </div>

        <SnippetActions snippetId={snippet.id} />
      </div>
    </article>
  );
}
