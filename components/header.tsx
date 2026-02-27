"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, User } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="z-50 w-full border-b border-border bg-card">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="white" strokeWidth="2">
              <path d="M3 18V9a2 2 0 012-2h14a2 2 0 012 2v9" strokeLinecap="round" />
              <path d="M3 18h18" strokeLinecap="round" />
              <circle cx="7" cy="18" r="2" fill="white" stroke="none" />
              <circle cx="17" cy="18" r="2" fill="white" stroke="none" />
              <path d="M7 7V5" strokeLinecap="round" />
              <path d="M17 7V5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-xl font-bold text-foreground">RVMarket</span>
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
            <Link href="/dashboard">Sell</Link>
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
          <Button variant="ghost" size="sm" className="gap-2 text-sm font-medium">
            <User className="h-4 w-4" />
            Sign In
          </Button>
          <Button size="sm" asChild>
            <Link href="/dashboard">Sell Your RV</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="space-y-1 px-4 py-4">
            <Link
              href="/"
              className="block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Buy RVs
            </Link>
            <Link
              href="/dashboard"
              className="block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sell Your RV
            </Link>
            <Link
              href="#"
              className="block rounded-lg px-3 py-2 text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              Research
            </Link>
            <div className="border-t border-border pt-4">
              <Button variant="outline" className="mb-2 w-full bg-transparent">
                Sign In
              </Button>
              <Button className="w-full" asChild>
                <Link href="/dashboard">Sell Your RV</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
