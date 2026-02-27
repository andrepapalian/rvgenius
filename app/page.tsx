"use client"

import { Suspense, useState } from "react"
import Image from "next/image"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { BrowseByBodyType } from "@/components/browse-by-body-type"
import { TestimonialsSection } from "@/components/testimonials-section"
import { SellCtaSection } from "@/components/sell-cta-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { FeaturedListingsSection } from "@/components/featured-listings-section"
import { SearchResultsSection } from "@/components/search-results-section"
import { BudgetCalculator } from "@/components/budget-calculator"
import { filterRVs } from "@/lib/rv-data"

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedType, setSelectedType] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [location, setLocation] = useState("")
  const [radius, setRadius] = useState("")

  const hasSearch =
    searchParams.get("q") ||
    searchParams.get("type") ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice") ||
    searchParams.get("location") ||
    searchParams.get("radius") ||
    searchParams.get("all")
  
  const listings = filterRVs({
    query: searchParams.get("q") || undefined,
    type: searchParams.get("type") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    location: searchParams.get("location") || undefined,
    radiusMiles: searchParams.get("radius") ? Number(searchParams.get("radius")) : undefined,
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (selectedType && selectedType !== "all") params.set("type", selectedType)
    if (maxPrice && maxPrice !== "any") params.set("maxPrice", maxPrice)
    if (location.trim()) params.set("location", location.trim())
    if (radius && radius !== "any") params.set("radius", radius)
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {!hasSearch && (
          <HeroSection
            selectedType={selectedType}
            maxPrice={maxPrice}
            location={location}
            radius={radius}
            onTypeChange={setSelectedType}
            onMaxPriceChange={setMaxPrice}
            onLocationChange={setLocation}
            onRadiusChange={setRadius}
            onSearch={handleSearch}
          />
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
                    <div className="relative h-64 overflow-hidden rounded-2xl lg:h-80 lg:rounded-3xl">
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

        {!hasSearch && <BrowseByBodyType />}

        {!hasSearch && <TestimonialsSection />}

        {!hasSearch && <SellCtaSection />}

        {!hasSearch && <WhyChooseUsSection />}

        {!hasSearch && <FeaturedListingsSection listings={listings} />}

        {/* Search Results */}
        {hasSearch && (
          <SearchResultsSection
            initialType={searchParams.get("type") || ""}
            initialQuery={searchParams.get("q") || ""}
            initialMaxPrice={searchParams.get("maxPrice") || ""}
            initialLocation={searchParams.get("location") || ""}
            initialRadius={searchParams.get("radius") || ""}
          />
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
