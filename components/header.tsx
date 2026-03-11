"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, LogIn, UserPlus, User } from "lucide-react"
import { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  sticky?: boolean
}

export function Header({ sticky = true }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(prev => {
      const next = !prev

      // On non-sticky pages (e.g. search results), scroll to top when opening the menu
      if (!prev && next && !sticky && typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }

      return next
    })
  }

  useEffect(() => {
    if (typeof document === "undefined") return

    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
    }
  }, [mobileMenuOpen])

  const mobileHeaderColor = "bg-white/80 border-b border-border/80 backdrop-blur-md"

  const mobileIconColor = "text-foreground"

  // Always use dark bars for the mobile menu icon
  const closedBarColor = "bg-foreground"

  const mobileMenuOverlay = (
    <div
      className={`lg:hidden fixed inset-0 z-40 bg-white ${
        mobileMenuOpen ? "" : "hidden"
      }`}
    >
      {/* Render a copy of the navbar bar so the menu button/X is available to close */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-border bg-white/80 backdrop-blur-md">
        {/* Mobile: menu/close button on the left */}
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-md p-2 lg:hidden transition-colors ${mobileIconColor}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="sr-only">Close main menu</span>
          <div className="relative h-6 w-6">
            {/* Top bar (medium length, left-aligned) */}
            <span
              className={`absolute block h-[3px] w-5 rounded origin-center transition-transform duration-300 ease-out ${
                mobileMenuOpen
                  ? "left-0 top-1/2 w-full translate-y-0 rotate-45 bg-foreground"
                  : `left-0 top-[4px] ${closedBarColor}`
              }`}
            />
            {/* Middle bar (longest, left-aligned) */}
            <span
              className={`absolute block h-[3px] w-6 rounded transition-opacity duration-200 ease-out ${
                mobileMenuOpen
                  ? "left-0 top-1/2 w-full opacity-0 bg-foreground"
                  : `left-0 top-[12px] opacity-100 ${closedBarColor}`
              }`}
            />
            {/* Bottom bar (shortest, left-aligned) */}
            <span
              className={`absolute block h-[3px] w-4 rounded origin-center transition-transform duration-300 ease-out ${
                mobileMenuOpen
                  ? "left-0 top-1/2 w-full translate-y-0 -rotate-45 bg-foreground"
                  : `left-0 top-[20px] ${closedBarColor}`
              }`}
            />
          </div>
        </button>

        {/* Logo (centered on mobile) */}
        <Link href="/" className="flex flex-1 justify-center items-center shrink-0 lg:flex-none lg:justify-start">
          <Image
            src="/images/rvgenius-logo.svg"
            alt="RVGenius"
            width={180}
            height={32}
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        {/* Mobile: unsigned account link on the right */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="/auth"
            className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-foreground outline-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <User className="h-6 w-6 stroke-[1.8]" />
          </Link>
        </div>
      </div>

      <div className="space-y-1 px-4 py-4 h-[calc(100vh-4rem)] overflow-y-auto">
        <Link
          href="/"
          className="block rounded-lg px-4 py-3 text-lg font-medium text-foreground hover:bg-muted"
          onClick={() => setMobileMenuOpen(false)}
        >
          Buy RVs
        </Link>
        <Link
          href="/auth"
          className="block rounded-lg px-4 py-3 text-lg font-medium text-foreground hover:bg-muted"
          onClick={() => setMobileMenuOpen(false)}
        >
          Sell
        </Link>
        <Link
          href="#"
          className="block rounded-lg px-4 py-3 text-lg font-medium text-foreground hover:bg-muted"
          onClick={() => setMobileMenuOpen(false)}
        >
          Research
        </Link>
        <div className="border-t border-border pt-4">
          <Button
            variant="outline"
            className="mb-3 w-full bg-transparent h-14 text-lg"
            asChild
          >
            <Link href="/auth?mode=signin">Sign In</Link>
          </Button>
          <Button className="w-full h-14 text-lg" asChild>
            <Link href="/auth">Sign Up</Link>
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <header
        className={`z-50 w-full ${sticky ? "sticky top-0" : "relative"} transition-colors duration-300 ${mobileHeaderColor}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile: menu button on the left */}
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-md p-2 lg:hidden transition-colors ${mobileIconColor}`}
          onClick={handleMobileMenuToggle}
        >
          <span className="sr-only">Open main menu</span>
          <div className="relative h-6 w-6">
            {/* Top bar (medium length, left-aligned) */}
            <span
              className={`absolute block h-[3px] w-5 rounded origin-center transition-transform duration-300 ease-out ${
                mobileMenuOpen
                  ? "left-0 top-1/2 w-full translate-y-0 rotate-45 bg-foreground"
                  : `left-0 top-[4px] ${closedBarColor}`
              }`}
            />
            {/* Middle bar (longest, left-aligned) */}
            <span
              className={`absolute block h-[3px] w-6 rounded transition-opacity duration-200 ease-out ${
                mobileMenuOpen
                  ? "left-0 top-1/2 w-full opacity-0 bg-foreground"
                  : `left-0 top-[12px] opacity-100 ${closedBarColor}`
              }`}
            />
            {/* Bottom bar (shortest, left-aligned) */}
            <span
              className={`absolute block h-[3px] w-4 rounded origin-center transition-transform duration-300 ease-out ${
                mobileMenuOpen
                  ? "left-0 top-1/2 w-full translate-y-0 -rotate-45 bg-foreground"
                  : `left-0 top-[20px] ${closedBarColor}`
              }`}
            />
          </div>
        </button>

        {/* Logo (centered on mobile) */}
        <Link href="/" className="flex flex-1 justify-center items-center shrink-0 lg:flex-none lg:justify-start">
          <Image
            src="/images/rvgenius-logo.svg"
            alt="RVGenius"
            width={180}
            height={32}
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium text-foreground">
                Buy
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/" className="w-full">All RVs</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/?type=class-a" className="w-full">Class A Motorhomes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/?type=class-b" className="w-full">Class B Campervans</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/?type=class-c" className="w-full">Class C Motorhomes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/?type=travel-trailer" className="w-full">Travel Trailers</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/?type=fifth-wheel" className="w-full">Fifth Wheels</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" asChild className="text-sm font-medium text-foreground">
            <Link href="/auth">Sell</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium text-foreground">
                Research
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>RV Reviews</DropdownMenuItem>
              <DropdownMenuItem>Buying Guides</DropdownMenuItem>
              <DropdownMenuItem>RV Types Explained</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="secondary" size="sm" asChild className="text-sm font-medium">
            <Link href="/auth?mode=signin">Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/auth">Sign Up</Link>
          </Button>
        </div>

          {/* Mobile: unsigned account link on the right */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/auth"
              className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-foreground outline-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <User className="h-6 w-6 stroke-[1.8]" />
            </Link>
          </div>
        </div>
      </header>

      {typeof document !== "undefined"
        ? ReactDOM.createPortal(mobileMenuOverlay, document.body)
        : mobileMenuOverlay}
    </>
  )
}
