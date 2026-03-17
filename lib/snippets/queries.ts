import { and, desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { snippets } from "@/lib/db/schema";

export async function listSnippetsByUser(userId: string) {
  return db.query.snippets.findMany({
    where: eq(snippets.userId, userId),
    orderBy: [desc(snippets.updatedAt)],
  });
}

export async function getOwnedSnippetById(id: string, userId: string) {
  return db.query.snippets.findFirst({
    where: and(eq(snippets.id, id), eq(snippets.userId, userId)),
  });
}
