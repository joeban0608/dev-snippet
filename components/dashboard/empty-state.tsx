import Link from "next/link";

export function EmptyState() {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-border bg-[rgba(255,250,243,0.8)] px-6 py-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">
        Empty state
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        Your dashboard is ready for the first snippet.
      </h2>
      <p className="muted mx-auto mt-3 max-w-xl leading-7">
        Start with a title and some code. Language and description are optional,
        but ownership is always enforced server-side.
      </p>
      <div className="mt-8">
        <Link className="button-primary" href="/dashboard/snippets/new">
          Create your first snippet
        </Link>
      </div>
    </div>
  );
}
