"use client"

import { useSearchParams } from "next/navigation"
import { AuthModeLink } from "@/components/auth-mode-link"
import { SignInForm } from "@/components/sign-in-form"
import { SignUpForm } from "@/components/sign-up-form"

type AuthMode = "signin" | "signup"

function getMode(mode: string | null): AuthMode {
  if (mode === "signin") return "signin"
  return "signup"
}

export function AuthCardContent() {
  const searchParams = useSearchParams()
  const mode: AuthMode = getMode(searchParams.get("mode"))

  return (
    <div
      key={mode}
      className="flex flex-col gap-10 animate-in fade-in slide-in-from-right-2 duration-300 fill-mode-both"
    >
      <div className="flex flex-col gap-2">
        {mode === "signup" ? (
          <>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Create an Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <AuthModeLink mode="signin" className="font-medium text-primary underline-offset-4 hover:underline">
                Sign in
              </AuthModeLink>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Sign in
            </h1>
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <AuthModeLink mode="signup" className="font-medium text-primary underline-offset-4 hover:underline">
                Sign up
              </AuthModeLink>
            </p>
          </>
        )}
      </div>
      {mode === "signup" ? <SignUpForm /> : <SignInForm />}
    </div>
  )
}
