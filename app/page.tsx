"use client"

import { Suspense, useState, useMemo, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RVCard } from "@/components/rv-card"
import { BudgetCalculator } from "@/components/budget-calculator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { filterRVs, rvTypes, type SearchFilters } from "@/lib/rv-data"
import { Search, ArrowRight, BarChart3, Shield, Wallet, Star, SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const rvCategories = [
  { id: "class-a", label: "Class A", image: "/images/categories/class-a.jpg" },
  { id: "class-b", label: "Class B", image: "/images/categories/class-b.jpg" },
  { id: "class-c", label: "Class C", image: "/images/categories/class-c.jpg" },
  { id: "travel-trailer", label: "Travel Trailers", image: "/images/categories/travel-trailer.jpg" },
  { id: "fifth-wheel", label: "Fifth Wheels", image: "/images/categories/fifth-wheel.jpg" },
  { id: "toy-hauler", label: "Toy Haulers", image: "/images/categories/toy-hauler.jpg" },
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

  const hasSearch = searchParams.get("q") || searchParams.get("type") || searchParams.get("minPrice") || searchParams.get("maxPrice") || searchParams.get("all")
  
  const listings = filterRVs({
    query: searchParams.get("q") || undefined,
    type: searchParams.get("type") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
  })

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
                      <span className="font-medium text-foreground">Free to list • No hidden fees</span>
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
                    Find your perfect RV or list yours for sale—simple and transparent.
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
              <h2 className="mb-8 text-center text-xl font-bold text-foreground sm:text-2xl">
                Browse by body type
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {rvCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/?type=${category.id}`}
                    className="group flex flex-col items-center"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
                      <Image
                        src={category.image}
                        alt={`${category.label} RV side profile`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                    <span className="mt-3 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
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
                What RVers are saying
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
                      List your RV in minutes. Free to list, no hidden fees—just a simple way to connect with buyers.
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
          <SearchResultsSection
            initialType={searchParams.get("type") || ""}
            initialQuery={searchParams.get("q") || ""}
            initialMaxPrice={searchParams.get("maxPrice") || ""}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

const priceRanges = [
  { label: "Any price", min: 0, max: 0 },
  { label: "Under $25,000", min: 0, max: 25000 },
  { label: "$25,000 – $50,000", min: 25000, max: 50000 },
  { label: "$50,000 – $100,000", min: 50000, max: 100000 },
  { label: "$100,000 – $200,000", min: 100000, max: 200000 },
  { label: "$200,000 – $300,000", min: 200000, max: 300000 },
  { label: "$300,000+", min: 300000, max: 0 },
]

const yearOptions = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017]

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "year-new", label: "Year: newest" },
  { value: "year-old", label: "Year: oldest" },
  { value: "mileage", label: "Mileage: lowest" },
]

function SearchResultsSection({
  initialType,
  initialQuery,
  initialMaxPrice,
}: {
  initialType: string
  initialQuery: string
  initialMaxPrice: string
}) {
  const router = useRouter()
  const [searchText, setSearchText] = useState(initialQuery)
  const [selectedType, setSelectedType] = useState(initialType)
  const [priceRange, setPriceRange] = useState(() => {
    if (initialMaxPrice) {
      const mp = Number(initialMaxPrice)
      const found = priceRanges.find(r => r.max === mp && r.min === 0)
      return found ? priceRanges.indexOf(found) : 0
    }
    return 0
  })
  const [minYear, setMinYear] = useState("")
  const [maxMileage, setMaxMileage] = useState("")
  const [minSleeps, setMinSleeps] = useState("")
  const [dealOnly, setDealOnly] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    type: true,
    price: true,
    year: false,
    mileage: false,
    sleeps: false,
    deal: false,
  })

  const toggleSection = useCallback((key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (selectedType) count++
    if (priceRange > 0) count++
    if (minYear) count++
    if (maxMileage) count++
    if (minSleeps) count++
    if (dealOnly) count++
    return count
  }, [selectedType, priceRange, minYear, maxMileage, minSleeps, dealOnly])

  const clearAllFilters = useCallback(() => {
    setSelectedType("")
    setPriceRange(0)
    setMinYear("")
    setMaxMileage("")
    setMinSleeps("")
    setDealOnly(false)
    setSearchText("")
    router.replace("/?all=true", { scroll: false })
  }, [router])

  const filteredListings = useMemo(() => {
    const range = priceRanges[priceRange]
    const filters: SearchFilters = {
      query: searchText || undefined,
      type: selectedType || undefined,
      minPrice: range && range.min > 0 ? range.min : undefined,
      maxPrice: range && range.max > 0 ? range.max : undefined,
      minYear: minYear ? Number(minYear) : undefined,
      maxMileage: maxMileage ? Number(maxMileage) : undefined,
      minSleeps: minSleeps ? Number(minSleeps) : undefined,
      dealOnly: dealOnly || undefined,
    }
    return filterRVs(filters)
  }, [searchText, selectedType, priceRange, minYear, maxMileage, minSleeps, dealOnly])

  const sortedListings = useMemo(() => {
    const sorted = [...filteredListings]
    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "year-new":
        return sorted.sort((a, b) => b.year - a.year)
      case "year-old":
        return sorted.sort((a, b) => a.year - b.year)
      case "mileage":
        return sorted.sort((a, b) => a.mileage - b.mileage)
      default:
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  }, [filteredListings, sortBy])

  const FilterSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <div className="border-b border-border pb-4">
      <button
        type="button"
        onClick={() => toggleSection(id)}
        className="flex w-full items-center justify-between py-2 text-sm font-semibold text-foreground"
      >
        {title}
        {expandedSections[id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {expandedSections[id] && <div className="pt-2">{children}</div>}
    </div>
  )

  const filterSidebarContent = (
    <div className="space-y-1">
      {/* Type */}
      <FilterSection id="type" title="Body Type">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setSelectedType("")}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${!selectedType ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-muted"}`}
          >
            All types
          </button>
          {rvTypes.map(t => (
            <button
              key={t.value}
              type="button"
              onClick={() => setSelectedType(selectedType === t.value ? "" : t.value)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${selectedType === t.value ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-muted"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection id="price" title="Price Range">
        <div className="space-y-2">
          {priceRanges.map((range, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPriceRange(i)}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${priceRange === i ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-muted"}`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Year */}
      <FilterSection id="year" title="Year">
        <Select value={minYear || "any"} onValueChange={v => setMinYear(v === "any" ? "" : v)}>
          <SelectTrigger className="w-full border-border bg-muted">
            <SelectValue placeholder="Any year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any year</SelectItem>
            {yearOptions.map(y => (
              <SelectItem key={y} value={String(y)}>{y} or newer</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Mileage */}
      <FilterSection id="mileage" title="Mileage">
        <Select value={maxMileage || "any"} onValueChange={v => setMaxMileage(v === "any" ? "" : v)}>
          <SelectTrigger className="w-full border-border bg-muted">
            <SelectValue placeholder="Any mileage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any mileage</SelectItem>
            <SelectItem value="5000">Under 5,000 mi</SelectItem>
            <SelectItem value="10000">Under 10,000 mi</SelectItem>
            <SelectItem value="25000">Under 25,000 mi</SelectItem>
            <SelectItem value="50000">Under 50,000 mi</SelectItem>
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Sleeps */}
      <FilterSection id="sleeps" title="Sleeps">
        <Select value={minSleeps || "any"} onValueChange={v => setMinSleeps(v === "any" ? "" : v)}>
          <SelectTrigger className="w-full border-border bg-muted">
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="6">6+</SelectItem>
            <SelectItem value="8">8+</SelectItem>
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Deal rating */}
      <FilterSection id="deal" title="Deal Rating">
        <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted">
          <input
            type="checkbox"
            checked={dealOnly}
            onChange={e => setDealOnly(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary accent-primary"
          />
          <span className="text-foreground">Show deals only</span>
        </label>
      </FilterSection>
    </div>
  )

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Top bar */}
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Search Results</h1>
            <p className="text-sm text-muted-foreground">
              {sortedListings.length} {sortedListings.length === 1 ? "RV" : "RVs"} found
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search input */}
            <div className="relative flex-1 sm:w-72 sm:flex-none">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search make, model, location…"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="hidden w-48 border-border bg-muted sm:flex">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(o => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mobile filter toggle */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>

            {/* Clear all */}
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="hidden gap-1 text-xs sm:flex">
                <X className="h-3 w-3" /> Clear all
              </Button>
            )}
          </div>
        </div>

        {/* Active filter pills */}
        {activeFilterCount > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedType && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {rvTypes.find(t => t.value === selectedType)?.label}
                <button type="button" onClick={() => setSelectedType("")}><X className="h-3 w-3" /></button>
              </span>
            )}
            {priceRange > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {priceRanges[priceRange].label}
                <button type="button" onClick={() => setPriceRange(0)}><X className="h-3 w-3" /></button>
              </span>
            )}
            {minYear && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {minYear}+ year
                <button type="button" onClick={() => setMinYear("")}><X className="h-3 w-3" /></button>
              </span>
            )}
            {maxMileage && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Under {Number(maxMileage).toLocaleString()} mi
                <button type="button" onClick={() => setMaxMileage("")}><X className="h-3 w-3" /></button>
              </span>
            )}
            {minSleeps && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Sleeps {minSleeps}+
                <button type="button" onClick={() => setMinSleeps("")}><X className="h-3 w-3" /></button>
              </span>
            )}
            {dealOnly && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#00a651]/10 px-3 py-1 text-xs font-medium text-[#00a651]">
                Deals only
                <button type="button" onClick={() => setDealOnly(false)}><X className="h-3 w-3" /></button>
              </span>
            )}
          </div>
        )}

        {/* Mobile sort */}
        <div className="mt-3 sm:hidden">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full border-border bg-muted">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(o => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Filters</h2>
              <button type="button" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            {filterSidebarContent}
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={clearAllFilters}>Clear all</Button>
              <Button className="flex-1" onClick={() => setShowFilters(false)}>
                Show {sortedListings.length} results
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main layout */}
      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-6 rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">Filters</h2>
              {activeFilterCount > 0 && (
                <button type="button" onClick={clearAllFilters} className="text-xs font-medium text-primary hover:underline">
                  Clear all
                </button>
              )}
            </div>
            {filterSidebarContent}
          </div>
        </aside>

        {/* Results grid */}
        <div className="flex-1">
          {sortedListings.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {sortedListings.map(listing => (
                <RVCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <p className="text-lg font-medium text-foreground">No RVs match your filters</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
              <Button className="mt-4" onClick={clearAllFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  )
}
