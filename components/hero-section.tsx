"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Star, BarChart3, Shield } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface HeroSectionProps {
  selectedType: string
  maxPrice: string
  onTypeChange: (value: string) => void
  onMaxPriceChange: (value: string) => void
  onSearch: () => void
}

export function HeroSection({
  selectedType,
  maxPrice,
  onTypeChange,
  onMaxPriceChange,
  onSearch,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10">
      <div className="absolute -right-[40%] top-0 h-full w-[80%] skew-x-[-12deg] bg-primary/8 lg:-right-[20%] lg:w-[55%]" aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-0">
          <div className="flex flex-col justify-center text-center sm:text-left lg:pr-6 xl:pr-12">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex justify-center sm:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="font-medium text-foreground">Free to list • No hidden fees</span>
              </div>
            </div>
            <h1 className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:mt-6 lg:text-5xl xl:text-6xl xl:leading-[1.1] [animation-delay:100ms]">
              Shop the <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">#1 RV</span> marketplace
            </h1>
            <p className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-4 max-w-lg text-lg text-muted-foreground [animation-delay:200ms] sm:mt-5">
              Find your perfect RV or list yours for sale—simple and transparent.
            </p>
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-6 sm:mt-8 [animation-delay:300ms]">
              <div className="relative flex flex-col gap-3 rounded-2xl bg-card/95 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-5">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Select value={selectedType} onValueChange={onTypeChange}>
                    <SelectTrigger className="w-full min-w-0 flex-1 border-border bg-muted sm:w-auto">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="class-a">Class A</SelectItem>
                      <SelectItem value="class-b">Class B</SelectItem>
                      <SelectItem value="class-c">Class C</SelectItem>
                      <SelectItem value="travel-trailer">Travel Trailer</SelectItem>
                      <SelectItem value="fifth-wheel">Fifth Wheel</SelectItem>
                      <SelectItem value="toy-hauler">Toy Hauler</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={maxPrice} onValueChange={onMaxPriceChange}>
                    <SelectTrigger className="w-full min-w-0 flex-1 border-border bg-muted sm:w-auto">
                      <SelectValue placeholder="Max price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any price</SelectItem>
                      <SelectItem value="25000">Under $25,000</SelectItem>
                      <SelectItem value="50000">Under $50,000</SelectItem>
                      <SelectItem value="75000">Under $75,000</SelectItem>
                      <SelectItem value="100000">Under $100,000</SelectItem>
                      <SelectItem value="150000">Under $150,000</SelectItem>
                      <SelectItem value="200000">Under $200,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="lg" onClick={onSearch} className="w-full gap-2">
                  <Search className="h-4 w-4 shrink-0" />
                  Search RVs
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-5 sm:mt-6 sm:justify-start sm:gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">15,000+</p>
                    <p className="text-xs text-muted-foreground">RVs listed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Verified</p>
                    <p className="text-xs text-muted-foreground">Sellers</p>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-center text-sm text-muted-foreground sm:text-left">
                Selling an RV? <Link href="/dashboard" className="font-medium text-primary underline-offset-4 hover:underline">List it for free</Link> and reach serious buyers.
              </p>
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="relative h-44 w-full overflow-hidden rounded-2xl lg:hidden">
              <Image src="/images/family-rv.jpg" alt="Happy family with their RV" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            <div className="relative hidden lg:block">
              <div className="relative h-[520px] overflow-hidden rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)]">
                <Image src="/images/family-rv.jpg" alt="Happy family with their RV" fill className="object-cover object-center" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-primary/5" />
                <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 bg-card/90 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-card">
                        <Image src="/images/couple-rv.jpg" alt="" fill className="object-cover" />
                      </div>
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-card">
                        <Image src="/images/retired-couple-rv.jpg" alt="" fill className="object-cover" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Your next adventure starts here</p>
                      <span className="text-xs text-muted-foreground">Simple, transparent marketplace</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
