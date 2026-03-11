"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronDown, LogOut, User } from "lucide-react"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Placeholder signed-in user – replace with real auth data later
  const user = {
    name: "Alex Johnson",
    image: null as string | null,
  }

  const initials = user.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")

  return (
    <header className="z-50 w-full shrink-0 border-b border-border/80 bg-card/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button (left of logo) */}
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <div className="relative h-6 w-6">
            {/* Top bar (medium length, left-aligned) */}
            <span
              className={`absolute block h-[3px] w-5 rounded origin-center transition-transform duration-300 ease-out ${
                mobileMenuOpen
                  ? "left-0 top-1/2 w-full translate-y-0 rotate-45 bg-foreground"
                  : "left-0 top-[4px] bg-foreground"
              }`}
            />
            {/* Middle bar (longest, left-aligned) */}
            <span
              className={`absolute block h-[3px] w-6 rounded transition-opacity duration-200 ease-out ${
                mobileMenuOpen
                  ? "left-0 top-1/2 w-full opacity-0 bg-foreground"
                  : "left-0 top-[12px] opacity-100 bg-foreground"
              }`}
            />
            {/* Bottom bar (shortest, left-aligned) */}
            <span
              className={`absolute block h-[3px] w-4 rounded origin-center transition-transform duration-300 ease-out ${
                mobileMenuOpen
                  ? "left-0 top-1/2 w-full translate-y-0 -rotate-45 bg-foreground"
                  : "left-0 top-[20px] bg-foreground"
              }`}
            />
          </div>
        </button>

        {/* Logo */}
        <Link href="/" className="relative z-10 flex shrink-0 items-center gap-2">
          <Image
            src="/images/rvgenius-logo.svg"
            alt="RVGenius"
            width={180}
            height={32}
            className="h-8 w-auto lg:h-9"
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

        {/* Signed-in controls on desktop: Avatar dropdown */}
        <div className="relative z-10 hidden shrink-0 items-center gap-3 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" className="rounded-full outline-none ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image ?? undefined} alt={user.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex w-full items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="flex w-full items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile avatar dropdown (right side) */}
        <div className="flex items-center gap-3 lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-foreground outline-none ring-offset-background translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.image ?? undefined} alt={user.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile" className="flex w-full items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="flex w-full items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Menu - no Sign In / Sign Up (no open/close animation) */}
      <div
        className={`lg:hidden border-t border-border bg-white fixed inset-x-0 top-16 bottom-0 z-40 ${
          mobileMenuOpen ? "pointer-events-auto" : "hidden pointer-events-none"
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
