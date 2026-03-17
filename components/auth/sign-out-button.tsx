import { signOut } from "@/lib/auth/auth";

type SignOutButtonProps = {
  className?: string;
};

export function SignOutButton({ className }: SignOutButtonProps) {
  return (
    <form
      action={async () => {
        "use server";

        await signOut({ redirectTo: "/" });
      }}
    >
      <button className={className ?? "button-secondary"} type="submit">
        Sign out
      </button>
    </form>
  );
}
