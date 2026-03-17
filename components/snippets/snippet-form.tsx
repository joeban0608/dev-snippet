"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import type {
  SnippetFormAction,
  SnippetFormState,
  SnippetFormValues,
} from "@/types/snippet";

const initialState: SnippetFormState = {
  errors: {},
  message: "",
};

type SnippetFormProps = {
  action: SnippetFormAction;
  submitLabel: string;
  initialValues?: SnippetFormValues;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button className="button-primary" disabled={pending} type="submit">
      {pending ? "Saving..." : label}
    </button>
  );
}

function ErrorText({ message }: { message?: string[] }) {
  if (!message?.length) {
    return null;
  }

  return <p className="text-sm font-medium text-[#a23f1e]">{message[0]}</p>;
}

export function SnippetForm({
  action,
  submitLabel,
  initialValues,
}: SnippetFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-[1.75rem] border border-border bg-surface p-6 shadow-[0_20px_60px_rgba(80,56,30,0.08)]"
    >
      <div className="grid gap-6">
        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Title
          </span>
          <input
            className="field"
            defaultValue={initialValues?.title ?? ""}
            name="title"
            placeholder="Add a short, searchable title"
          />
          <ErrorText message={state.errors.title} />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Language
          </span>
          <input
            className="field"
            defaultValue={initialValues?.language ?? ""}
            name="language"
            placeholder="TypeScript, SQL, Bash..."
          />
          <ErrorText message={state.errors.language} />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Description
          </span>
          <textarea
            className="field min-h-28 resize-y"
            defaultValue={initialValues?.description ?? ""}
            name="description"
            placeholder="Optional context for when you come back later"
          />
          <ErrorText message={state.errors.description} />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Content
          </span>
          <textarea
            className="field min-h-72 resize-y font-mono text-sm leading-7"
            defaultValue={initialValues?.content ?? ""}
            name="content"
            placeholder="Paste the snippet body here"
          />
          <ErrorText message={state.errors.content} />
        </label>
      </div>

      {state.message ? (
        <p className="rounded-2xl bg-[rgba(162,63,30,0.08)] px-4 py-3 text-sm font-medium text-[#933a1c]">
          {state.message}
        </p>
      ) : null}

      <div className="flex items-center justify-end">
        <SubmitButton label={submitLabel} />
      </div>
    </form>
  );
}
