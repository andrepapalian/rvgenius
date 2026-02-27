import Link from "next/link"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Sign Up | RVMarket",
  description: "Create your RVMarket account to list and manage your RVs.",
}

export default function SignUpPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Sign up
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This is a placeholder sign-up page. We&apos;ll add the full sign-up flow here later.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">
            The sign-up experience is coming soon. In the meantime, you can continue browsing RVs on the{" "}
            <Link href="/" className="font-medium text-primary underline-offset-4 hover:underline">
              home page
            </Link>
            .
          </p>

          <div className="mt-6 flex gap-3">
            <Button asChild>
              <Link href="/">Browse RVs</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Go to dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

