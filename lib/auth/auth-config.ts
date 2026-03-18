import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

import { db } from "@/lib/db";
import { accounts, sessions, users, verificationTokens } from "@/lib/db/schema";
import { getAuthEnv } from "@/lib/utils/env";

const authEnv = getAuthEnv();

export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: {
    strategy: "database",
  },
  providers: [
    GitHub({
      clientId: authEnv.AUTH_GITHUB_ID,
      clientSecret: authEnv.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: authEnv.AUTH_GOOGLE_ID,
      clientSecret: authEnv.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }

      return session;
    },
  },
  secret: authEnv.AUTH_SECRET,
} satisfies NextAuthConfig;
