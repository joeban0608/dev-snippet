import { signIn } from "@/lib/auth/auth";

type SignInButtonProps = {
  provider: "github" | "google";
  label?: string;
  className?: string;
};

export function SignInButton({
  provider,
  label,
  className,
}: SignInButtonProps) {
  return (
    <form
      action={async () => {
        "use server";

        await signIn(provider, { redirectTo: "/dashboard" });
      }}
    >
      <button className={className ?? "button-primary"} type="submit">
        {label ?? `Continue with ${provider === "github" ? "GitHub" : "Google"}`}
      </button>
    </form>
  );
}
