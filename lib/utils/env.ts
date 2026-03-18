import { z } from "zod";

const authEnvSchema = z.object({
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required."),
  AUTH_GITHUB_ID: z.string().min(1, "AUTH_GITHUB_ID is required."),
  AUTH_GITHUB_SECRET: z.string().min(1, "AUTH_GITHUB_SECRET is required."),
  AUTH_GOOGLE_ID: z.string().min(1, "AUTH_GOOGLE_ID is required."),
  AUTH_GOOGLE_SECRET: z.string().min(1, "AUTH_GOOGLE_SECRET is required."),
});

const databaseEnvSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required."),
});

export function getAuthEnv() {
  return authEnvSchema.parse({
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
    AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
  });
}

export function getDatabaseUrl() {
  return databaseEnvSchema.parse({
    DATABASE_URL: process.env.DATABASE_URL,
  }).DATABASE_URL;
}
