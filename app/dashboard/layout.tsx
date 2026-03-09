import { DashboardHeader } from "@/components/dashboard-header"
import { Footer } from "@/components/footer"
import { DashboardLayoutClient } from "@/components/dashboard-layout-client"

export const metadata = {
  title: "Dashboard | RVGenius",
  description: "Manage your account and listings",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <DashboardHeader />
      <DashboardLayoutClient>{children}</DashboardLayoutClient>
      <Footer />
    </div>
  )
}
