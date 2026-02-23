"use client"

import { Suspense, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RVCard } from "@/components/rv-card"
import { BudgetCalculator } from "@/components/budget-calculator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { searchRVs } from "@/lib/rv-data"
import { Search, ArrowRight, BarChart3, Shield, Wallet, Star } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const rvCategories = [
  { id: "class-a", label: "Class A", image: "/images/rv-hero.jpg" },
  { id: "class-b", label: "Class B", image: "/images/rv-hero.jpg" },
  { id: "class-c", label: "Class C", image: "/images/rv-hero.jpg" },
  { id: "travel-trailer", label: "Travel Trailers", image: "/images/rv-hero.jpg" },
  { id: "fifth-wheel", label: "Fifth Wheels", image: "/images/rv-hero.jpg" },
  { id: "toy-hauler", label: "Toy Haulers", image: "/images/rv-hero.jpg" },
]

const testimonials = [
  {
    name: "Sarah & Mike Johnson",
    location: "Denver, CO",
    image: "/images/couple-rv.jpg",
    quote: "Found our dream Class B in just two weeks. The budget calculator helped us know exactly what we could afford!",
    rating: 5,
  },
  {
    name: "The Martinez Family",
    location: "Austin, TX", 
    image: "/images/family-rv.jpg",
    quote: "We sold our travel trailer in 3 days and got more than we expected. The process was so simple.",
    rating: 5,
  },
  {
    name: "Robert & Linda Chen",
    location: "Phoenix, AZ",
    image: "/images/retired-couple-rv.jpg",
    quote: "After retiring, we found the perfect fifth wheel for full-time living. RVMarket made it easy to compare options.",
    rating: 5,
  },
]

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedType, setSelectedType] = useState("")
  const [maxPrice, setMaxPrice] = useState("")

  const hasSearch = searchParams.get("q") || searchParams.get("type") || searchParams.get("minPrice") || searchParams.get("maxPrice")
  
  const listings = searchRVs(
    searchParams.get("q") || "",
    searchParams.get("type") || undefined,
    searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined
  )

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (selectedType && selectedType !== "all") params.set("type", selectedType)
    if (maxPrice && maxPrice !== "any") params.set("maxPrice", maxPrice)
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with People */}
        {!hasSearch && (
          <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10">
            {/* Diagonal accent band */}
            <div
              className="absolute -right-[40%] top-0 h-full w-[80%] skew-x-[-12deg] bg-primary/8 lg:-right-[20%] lg:w-[55%]"
              aria-hidden
            />
            {/* Subtle grid texture */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                  linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
              }}
              aria-hidden
            />

            <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-0">
                {/* Left Column - Search */}
                <div className="flex flex-col justify-center text-center sm:text-left lg:pr-6 xl:pr-12">
                  {/* Trust pill */}
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 flex justify-center sm:justify-start">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                        ))}
                      </div>
                      <span className="font-medium text-foreground">Trusted by 50,000+ RVers</span>
                    </div>
                  </div>

                  <h1 className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:mt-6 lg:text-5xl xl:text-6xl xl:leading-[1.1] [animation-delay:100ms]">
                    Shop the{" "}
                    <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      #1 RV
                    </span>{" "}
                    marketplace
                  </h1>
                  <p className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-4 max-w-lg text-lg text-muted-foreground [animation-delay:200ms] sm:mt-5">
                    Join thousands of happy adventurers who found their perfect RV
                  </p>

                  {/* Search Box */}
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-6 sm:mt-8 [animation-delay:300ms]">
                    <div className="relative flex flex-col gap-3 rounded-2xl bg-card/95 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-5">
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Select value={selectedType} onValueChange={setSelectedType}>
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

                        <Select value={maxPrice} onValueChange={setMaxPrice}>
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

                      <Button size="lg" onClick={handleSearch} className="w-full gap-2">
                        <Search className="h-4 w-4 shrink-0" />
                        Search RVs
                      </Button>
                    </div>

                    {/* Quick Stats */}
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

                    {/* Sell CTA */}
                    <p className="mt-5 text-center text-sm text-muted-foreground sm:text-left">
                      Selling an RV?{" "}
                      <Link href="/dashboard" className="font-medium text-primary underline-offset-4 hover:underline">
                        List it for free
                      </Link>{" "}
                      and reach serious buyers.
                    </p>
                  </div>
                </div>

                {/* Right Column - Hero Image (striking frame) */}
                <div className="relative mt-8 lg:mt-0">
                  {/* Mobile: compact hero image strip */}
                  <div className="relative h-44 w-full overflow-hidden rounded-2xl lg:hidden">
                    <Image
                      src="/images/family-rv.jpg"
                      alt="Happy family with their RV"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Desktop: shaped image with dramatic shadow */}
                  <div className="relative hidden lg:block">
                    <div className="relative h-[520px] overflow-hidden rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)]">
                      <Image
                        src="/images/family-rv.jpg"
                        alt="Happy family with their RV"
                        fill
                        className="object-cover object-center"
                        priority
                      />
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
                            <p className="text-sm font-semibold text-foreground">Join 50,000+ happy RVers</p>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                              ))}
                              <span className="ml-1 text-xs text-muted-foreground">4.9/5 rating</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Budget Calculator Section */}
        {!hasSearch && (
          <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                    What can I afford?
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Use our budget calculator to find RVs that fit your monthly payment.
                    Simply enter what you want to pay each month, and we'll show you your total budget.
                  </p>
                  <div className="mt-8">
                    <div className="relative h-64 overflow-hidden rounded-xl lg:h-80">
                      <Image
                        src="/images/couple-rv.jpg"
                        alt="Couple enjoying their RV"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <BudgetCalculator />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Browse by Body Type */}
        {!hasSearch && (
          <section className="bg-card px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-6 text-center text-xl font-bold text-foreground">
                Browse by body type
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {rvCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/?type=${category.id}`}
                    className="group flex flex-col items-center rounded-xl border border-border bg-card p-4 transition-all hover:border-primary hover:shadow-md"
                  >
                    <div className="relative mb-3 h-16 w-full overflow-hidden rounded-lg">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.label}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {category.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {!hasSearch && (
          <section className="bg-muted/50 px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-4 text-center text-2xl font-bold text-foreground">
                Trusted by RV enthusiasts everywhere
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
                Real stories from real people who found their perfect RV
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                    <div className="mb-3 flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sell Your RV CTA */}
        {!hasSearch && (
          <section className="bg-card px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="relative overflow-hidden rounded-2xl bg-primary">
                <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
                  <Image
                    src="/images/rv-hero.jpg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10 p-8 lg:p-12">
                  <div className="max-w-xl">
                    <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
                      Ready to sell your RV?
                    </h2>
                    <p className="mt-3 text-primary-foreground/90">
                      List your RV in minutes and reach thousands of qualified buyers. 
                      Get the best price with our trusted marketplace.
                    </p>
                    <Button size="lg" variant="secondary" className="mt-6" asChild>
                      <Link href="/dashboard">
                        List your RV for free
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Us */}
        {!hasSearch && (
          <section className="bg-card px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 text-center text-2xl font-bold text-foreground">
                Why choose RVMarket?
              </h2>
              <div className="grid gap-8 sm:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    Unbiased information
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Deal ratings, vehicle history, and pricing data help you make the best decision.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    Largest selection
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Browse the most RV inventory to find your dream vehicle at the best price.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Wallet className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    More ways to buy & sell
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant offers for your RV and start your purchase online.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Featured Listings */}
        {!hasSearch && (
          <section className="bg-muted/50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-foreground">Featured RVs near you</h2>
                <Link href="/?all=true" className="text-sm font-medium text-primary hover:underline">
                  View all
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {listings.slice(0, 4).map((listing) => (
                  <RVCard key={listing.id} listing={listing} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search Results */}
        {hasSearch && (
          <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Search Results</h1>
                <p className="text-sm text-muted-foreground">
                  {listings.length} {listings.length === 1 ? "RV" : "RVs"} found
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="search"
                  placeholder="Search listings..."
                  className="w-64"
                  defaultValue={searchParams.get("q") || ""}
                />
                <Button variant="outline" asChild className="bg-transparent">
                  <Link href="/">Clear</Link>
                </Button>
              </div>
            </div>

            {listings.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {listings.map((listing) => (
                  <RVCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <p className="text-lg font-medium text-foreground">No RVs found</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your search filters
                </p>
                <Button className="mt-4" asChild>
                  <Link href="/">Clear Filters</Link>
                </Button>
              </div>
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
