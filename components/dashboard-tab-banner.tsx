"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { dashboardNavItems } from "@/components/dashboard-sidebar"

export function DashboardTabBanner() {
  const pathname = usePathname()

  return (
    <div className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <nav
        className="mx-auto flex w-full max-w-7xl flex-nowrap items-center justify-start gap-1 overflow-x-auto px-4 py-3 sm:gap-2 sm:px-6 lg:justify-center lg:px-8"
        aria-label="My Account"
      >
        {dashboardNavItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard/listings" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
