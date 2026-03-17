"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { snippets } from "@/lib/db/schema";
import {
  createSnippetSchema,
  updateSnippetSchema,
} from "@/lib/validation/snippet";
import type { SnippetFormState } from "@/types/snippet";

function payloadFromFormData(formData: FormData) {
  return {
    title: formData.get("title"),
    content: formData.get("content"),
    language: formData.get("language"),
    description: formData.get("description"),
  };
}

function validationErrorState(message: string, errors: SnippetFormState["errors"]) {
  return {
    message,
    errors,
  } satisfies SnippetFormState;
}

export async function createSnippetAction(
  _prevState: SnippetFormState,
  formData: FormData,
): Promise<SnippetFormState> {
  const user = await requireUser();
  const parsed = createSnippetSchema.safeParse(payloadFromFormData(formData));

  if (!parsed.success) {
    return validationErrorState(
      "Please fix the form fields before saving.",
      parsed.error.flatten().fieldErrors,
    );
  }

  const [snippet] = await db
    .insert(snippets)
    .values({
      ...parsed.data,
      userId: user.id,
      updatedAt: new Date(),
    })
    .returning({ id: snippets.id });

  revalidatePath("/dashboard");
  redirect(`/dashboard/snippets/${snippet.id}`);
}

export async function updateSnippetAction(
  snippetId: string,
  _prevState: SnippetFormState,
  formData: FormData,
): Promise<SnippetFormState> {
  const user = await requireUser();
  const parsed = updateSnippetSchema.safeParse({
    id: snippetId,
    ...payloadFromFormData(formData),
  });

  if (!parsed.success) {
    return validationErrorState(
      "Please fix the form fields before saving.",
      parsed.error.flatten().fieldErrors,
    );
  }

  const [updatedSnippet] = await db
    .update(snippets)
    .set({
      title: parsed.data.title,
      content: parsed.data.content,
      language: parsed.data.language,
      description: parsed.data.description,
      updatedAt: new Date(),
    })
    .where(and(eq(snippets.id, parsed.data.id), eq(snippets.userId, user.id)))
    .returning({ id: snippets.id });

  if (!updatedSnippet) {
    return {
      message: "Snippet not found or you no longer have access to it.",
      errors: {},
    };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/snippets/${parsed.data.id}`);
  redirect(`/dashboard/snippets/${updatedSnippet.id}`);
}

export async function deleteSnippetAction(snippetId: string) {
  const user = await requireUser();

  await db
    .delete(snippets)
    .where(and(eq(snippets.id, snippetId), eq(snippets.userId, user.id)));

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
