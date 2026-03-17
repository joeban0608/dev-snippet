import { signIn } from "@/lib/auth/auth";

type SignInButtonProps = {
  className?: string;
};

export function SignInButton({ className }: SignInButtonProps) {
  return (
    <form
      action={async () => {
        "use server";

        await signIn("github", { redirectTo: "/dashboard" });
      }}
    >
      <button className={className ?? "button-primary"} type="submit">
        Continue with GitHub
      </button>
    </form>
  );
}
