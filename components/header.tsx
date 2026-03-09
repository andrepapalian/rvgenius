"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type HeaderVariant = "default" | "home"

interface HeaderProps {
  variant?: HeaderVariant
}

export function Header({ variant = "default" }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isHomeVariant = variant === "home"

  const handleMobileMenuToggle = () => {
    const nextOpen = !mobileMenuOpen
    setMobileMenuOpen(nextOpen)

    if (nextOpen && typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (typeof document === "undefined") return

    if (mobileMenuOpen) {
      const originalBodyOverflow = document.body.style.overflow
      const originalHtmlOverflow = document.documentElement.style.overflow

      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"

      return () => {
        document.body.style.overflow = originalBodyOverflow
        document.documentElement.style.overflow = originalHtmlOverflow
      }
    }
  }, [mobileMenuOpen])

  const mobileHeaderColor =
    isHomeVariant && !mobileMenuOpen
      ? "bg-transparent"
      : "bg-white border-b border-border"

  const mobileIconColor = isHomeVariant
    ? mobileMenuOpen
      ? "text-foreground"
      : "text-white"
    : "text-foreground"

  const closedBarColor = isHomeVariant ? "bg-white" : "bg-foreground"

  return (
    <header
      className={`z-50 w-full relative transition-colors duration-300 ${mobileHeaderColor} lg:bg-card lg:border-b lg:border-border`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          {isHomeVariant && !mobileMenuOpen && (
            <Image
              src="/images/rvgenius-logo-main-whiterv.svg"
              alt="RVGenius"
              width={140}
              height={24}
              className="h-6 w-auto lg:hidden"
            />
          )}
          <Image
            src="/images/rvgenius-logo-main.svg"
            alt="RVGenius"
            width={140}
            height={24}
            className={`h-6 w-auto lg:h-7 ${isHomeVariant && !mobileMenuOpen ? "hidden lg:block" : "block"}`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
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

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`inline-flex items-center justify-center rounded-md p-2 lg:hidden transition-colors ${mobileIconColor}`}
          onClick={handleMobileMenuToggle}
        >
          <span className="sr-only">Open main menu</span>
          <div className="relative h-6 w-6">
            <span
              className={`absolute left-0 top-1/2 block h-[2px] w-full rounded transition-transform duration-300 ease-out origin-center ${
                mobileMenuOpen ? "translate-y-0 rotate-45 bg-foreground" : `-translate-y-1.5 ${closedBarColor}`
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-[2px] w-full rounded ${
                mobileMenuOpen ? "opacity-0 bg-foreground" : `opacity-100 ${closedBarColor}`
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-[2px] w-full rounded transition-transform duration-300 ease-out origin-center ${
                mobileMenuOpen ? "translate-y-0 -rotate-45 bg-foreground" : `translate-y-1.5 ${closedBarColor}`
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu (full-screen overlay on mobile) */}
      <div
        className={`lg:hidden border-t border-border bg-white transform origin-top transition-all duration-300 ease-out fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="space-y-1 px-4 py-4 h-full">
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
    </header>
  )
}
