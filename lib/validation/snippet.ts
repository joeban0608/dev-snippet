import { z } from "zod";

const optionalTextField = z.preprocess((value) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
}, z.string().max(120).optional());

const optionalLongTextField = z.preprocess((value) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
}, z.string().max(500).optional());

const snippetFields = {
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(120, "Title must be 120 characters or fewer."),
  content: z
    .string()
    .trim()
    .min(1, "Content is required.")
    .max(12000, "Content must be 12000 characters or fewer."),
  language: optionalTextField,
  description: optionalLongTextField,
};

export const createSnippetSchema = z.object(snippetFields);

export const updateSnippetSchema = z.object({
  id: z.string().min(1),
  ...snippetFields,
});
