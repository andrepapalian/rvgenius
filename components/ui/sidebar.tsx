"use client"

import * as React from "react"
import ReactDOM from "react-dom"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

type SidebarContext = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(({ className, defaultOpen = true, open: controlledOpen, onOpenChange, children, ...props }, ref) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)
  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = React.useCallback(
    (value: boolean) => {
      if (onOpenChange) onOpenChange(value)
      else setUncontrolledOpen(value)
    },
    [onOpenChange]
  )

  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)")
    setIsMobile(mq.matches)
    const handler = () => setIsMobile(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((o) => !o)
    else setOpen(!open)
  }, [isMobile, open, setOpen])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === SIDEBAR_KEYBOARD_SHORTCUT) {
        e.preventDefault()
        toggleSidebar()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const value: SidebarContext = {
    state: open ? "expanded" : "collapsed",
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  }

  return (
    <SidebarContext.Provider value={value}>
      <div
        ref={ref}
        className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)}
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH,
            "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

const SIDEBAR_HEADER_OFFSET = 64   // 4rem, match dashboard header
const SIDEBAR_FOOTER_OFFSET = 256 // 16rem, approximate footer height

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { collapsible?: "offcanvas" | "icon" | "none" }
>(({ className, collapsible = "offcanvas", children, ...props }, ref) => {
  const { open, openMobile, isMobile, setOpenMobile } = useSidebar()
  const visible = isMobile ? openMobile : open

  if (isMobile && !visible) return null

  const aside = (
    <aside
      ref={ref}
      data-state={visible ? "expanded" : "collapsed"}
      data-collapsible={collapsible}
      className={cn(
        "z-50 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width,transform] duration-200 ease-linear",
        isMobile
          ? "fixed inset-y-0 left-0 min-h-svh w-[var(--sidebar-width-mobile)] translate-x-0"
          : "fixed left-0 lg:translate-x-0",
        !isMobile && visible && "w-[var(--sidebar-width)]",
        !isMobile && !visible && collapsible === "icon" && "w-[var(--sidebar-width-icon)] overflow-hidden",
        !isMobile && !visible && collapsible !== "icon" && "w-0 overflow-hidden",
        className
      )}
      style={
        !isMobile
          ? {
              top: `${SIDEBAR_HEADER_OFFSET}px`,
              bottom: `${SIDEBAR_FOOTER_OFFSET}px`,
              height: `calc(100vh - ${SIDEBAR_HEADER_OFFSET + SIDEBAR_FOOTER_OFFSET}px)`,
              ["--sidebar-width" as string]: SIDEBAR_WIDTH,
              ["--sidebar-width-icon" as string]: SIDEBAR_WIDTH_ICON,
            }
          : undefined
      }
      {...props}
    >
      {children}
    </aside>
  )

  return (
    <>
      {isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-hidden
          onClick={() => setOpenMobile(false)}
        />
      )}
      {!isMobile && typeof document !== "undefined"
        ? ReactDOM.createPortal(aside, document.body)
        : aside}
    </>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex h-14 shrink-0 items-center gap-2 border-b border-sidebar-border px-4", className)} {...props} />
  )
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex shrink-0 flex-col overflow-auto", className)} {...props} />
  )
)
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("shrink-0 border-t border-sidebar-border p-2", className)} {...props} />
  )
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-2", className)} {...props} />
)
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild, ...props }, ref) => {
  const Comp = asChild ? Slot.Root : "div"
  return (
    <Comp
      ref={ref}
      className={cn("mb-2 px-2 text-xs font-medium text-sidebar-foreground/70", className)}
      {...props}
    />
  )
})
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
  )
)
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("list-none", className)} {...props} />
)
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & { asChild?: boolean; isActive?: boolean }
>(({ className, asChild, isActive, ...props }, ref) => {
  const Comp = asChild ? Slot.Root : "a"
  return (
    <Comp
      ref={ref}
      data-active={isActive}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"main">>(
  ({ className, ...props }, ref) => (
    <main
      ref={ref}
      className={cn("relative flex flex-1 flex-col min-h-0", className)}
      {...props}
    />
  )
)
SidebarInset.displayName = "SidebarInset"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      ref={ref}
      type="button"
      aria-label="Toggle sidebar"
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        className
      )}
      onClick={(e) => {
        onClick?.(e)
        toggleSidebar()
      }}
      {...props}
    />
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
}
