import NextAuth from "next-auth";
import { redirect } from "next/navigation";

import { authConfig } from "@/lib/auth/auth-config";
import type { SessionUser } from "@/types/auth";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export async function requireUser(): Promise<SessionUser> {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return session.user;
}
