"use client"

import { DashboardTabBanner } from "@/components/dashboard-tab-banner"

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DashboardTabBanner />
      <main className="flex-1 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </>
  )
}
