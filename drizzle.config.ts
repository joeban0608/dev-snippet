import { defineConfig } from "drizzle-kit";

function getFirstNonEmpty(...values: Array<string | undefined>) {
  return values.find((value) => value && value.trim().length > 0);
}

export default defineConfig({
  out: "./drizzle/migrations",
  schema: "./lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url:
      getFirstNonEmpty(
        process.env.DIRECT_DATABASE_URL,
        process.env.DATABASE_URL,
      ) ?? "postgres://postgres:postgres@localhost:5432/local",
  },
});
