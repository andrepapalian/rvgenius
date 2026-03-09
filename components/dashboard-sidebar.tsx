"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { List, MessageSquare, Heart, Settings, PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export const dashboardNavItems = [
  { title: "Listings", href: "/dashboard/listings", icon: List },
  { title: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { title: "Saved RVs", href: "/dashboard/saved", icon: Heart },
  { title: "Profile", href: "/dashboard/profile", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader
        className={cn(
          "w-full justify-between",
          isCollapsed && "justify-center px-0"
        )}
      >
        {isCollapsed ? null : (
          <span className="text-lg font-semibold text-sidebar-foreground">My Account</span>
        )}
        <SidebarTrigger
          className={cn("-mr-1", isCollapsed && "mr-0")}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <PanelLeft className="size-5" />
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent className={cn("px-2 pb-2", isCollapsed && "px-1")}>
        <SidebarGroup className="py-1">
          <SidebarMenu className="gap-0.5">
            {dashboardNavItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard/listings" && pathname.startsWith(item.href))
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      isCollapsed ? "justify-center px-2" : "text-base lg:py-2.5"
                    )}
                  >
                    <Link href={item.href} title={item.title}>
                      <item.icon
                        className={cn("shrink-0", isCollapsed ? "size-4" : "size-5")}
                      />
                      {!isCollapsed && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export function DashboardSidebarTrigger() {
  return (
    <SidebarTrigger className="-ml-1">
      <PanelLeft className="size-5" />
    </SidebarTrigger>
  )
}

export function MobileAccountTabs() {
  const pathname = usePathname()

  return (
    <nav
      className="flex h-14 flex-1 flex-nowrap items-center gap-1 overflow-x-auto border-b border-border bg-card px-2 lg:hidden"
      aria-label="My Account"
    >
      <div className="flex shrink-0 gap-1">
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
      </div>
    </nav>
  )
}
