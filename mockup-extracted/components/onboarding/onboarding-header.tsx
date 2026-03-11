import { Caravan } from "lucide-react"
import Link from "next/link"

export function OnboardingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Caravan className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">
            RVMarket
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="#" className="text-primary hover:underline">
              Contact support
            </Link>
          </span>
        </div>
      </div>
    </header>
  )
}
