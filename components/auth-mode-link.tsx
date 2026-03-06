"use client"

import { useRouter } from "next/navigation"

/**
 * Link that uses router.replace() so switching between sign in / sign up
 * doesn’t push new history entries. Back button then returns to the page
 * the user came from instead of toggling auth mode.
 */
export function AuthModeLink({
  mode,
  children,
  className,
}: {
  mode: "signin" | "signup"
  children: React.ReactNode
  className?: string
}) {
  const router = useRouter()
  const href = mode === "signin" ? "/auth?mode=signin" : "/auth"

  return (
    <button
      type="button"
      onClick={() => router.replace(href)}
      className={className}
    >
      {children}
    </button>
  )
}
