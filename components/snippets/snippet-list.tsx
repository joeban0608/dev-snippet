import { SnippetCard } from "@/components/snippets/snippet-card";
import type { SnippetListItem } from "@/types/snippet";

type SnippetListProps = {
  snippets: SnippetListItem[];
};

export function SnippetList({ snippets }: SnippetListProps) {
  return (
    <div className="space-y-4">
      {snippets.map((snippet) => (
        <SnippetCard key={snippet.id} snippet={snippet} />
      ))}
    </div>
  );
}
