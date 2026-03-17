export type SnippetFormValues = {
  title: string;
  content: string;
  language?: string | null;
  description?: string | null;
};

export type SnippetListItem = {
  id: string;
  title: string;
  content: string;
  language: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

export type SnippetFormState = {
  errors: {
    title?: string[];
    content?: string[];
    language?: string[];
    description?: string[];
    id?: string[];
  };
  message: string;
};

export type SnippetFormAction = (
  state: SnippetFormState,
  payload: FormData,
) => Promise<SnippetFormState>;
