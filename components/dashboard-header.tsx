"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="z-50 w-full shrink-0 border-b border-border bg-card">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex shrink-0 items-center gap-2">
          <Image
            src="/images/rvgenius-logo-main.svg"
            alt="RVGenius"
            width={140}
            height={24}
            className="h-6 w-auto lg:h-7"
          />
        </Link>

        {/* Desktop Navigation - absolutely centered in container to align with tab bar below */}
        <nav className="absolute left-0 right-0 hidden items-center justify-center gap-1 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium text-foreground shrink-0">
                Buy
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
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

          <Button variant="ghost" asChild className="text-sm font-medium text-foreground shrink-0">
            <Link href="/auth">Sell</Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm font-medium text-foreground shrink-0">
                Research
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuItem>RV Reviews</DropdownMenuItem>
              <DropdownMenuItem>Buying Guides</DropdownMenuItem>
              <DropdownMenuItem>RV Types Explained</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Sign Out on desktop */}
        <div className="relative z-10 hidden shrink-0 lg:block">
          <Button variant="ghost" size="sm" asChild className="text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
            <Link href="/">Sign Out</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="relative h-6 w-6">
            <span
              className={`absolute left-0 top-1/2 block h-[2px] w-full rounded bg-foreground transition-transform duration-300 ease-out origin-center ${
                mobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-[2px] w-full rounded bg-foreground ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-[2px] w-full rounded bg-foreground transition-transform duration-300 ease-out origin-center ${
                mobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu - no Sign In / Sign Up */}
      <div
        className={`lg:hidden border-t border-border bg-white transform origin-top transition-all duration-300 ease-out fixed inset-x-0 top-16 bottom-0 z-40 ${
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
              className="w-full bg-transparent h-14 text-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              asChild
            >
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                Sign Out
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
