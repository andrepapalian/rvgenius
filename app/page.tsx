"use client"

import { Suspense, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { HomeHeader } from "@/components/home-header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { BrowseByBodyType } from "@/components/browse-by-body-type"
import { SellCtaSection } from "@/components/sell-cta-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { FeaturedListingsSection } from "@/components/featured-listings-section"
import { SearchResultsSection } from "@/components/search-results-section"
import { filterRVs } from "@/lib/rv-data"
import { BudgetCalculatorSection } from "@/components/budget-calculator-section"

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedType, setSelectedType] = useState("")
  const [location, setLocation] = useState("")

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
    if (location.trim()) params.set("location", location.trim())
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {hasSearch ? <Header sticky={false} /> : <HomeHeader />}

      <main className="flex-1">
        {!hasSearch && (
          <HeroSection
            selectedType={selectedType}
            location={location}
            onTypeChange={setSelectedType}
            onLocationChange={setLocation}
            onSearch={handleSearch}
          />
        )}

        {!hasSearch && <BudgetCalculatorSection />}

        {!hasSearch && <BrowseByBodyType />}

        {!hasSearch && <SellCtaSection />}

        {!hasSearch && <WhyChooseUsSection />}

        {!hasSearch && <FeaturedListingsSection listings={listings} />}

        {/* Search Results */}
        {hasSearch && (
          <div className="min-h-full bg-[#F9F9F9]">
            <SearchResultsSection
              initialType={searchParams.get("type") || ""}
              initialQuery={searchParams.get("q") || ""}
              initialMaxPrice={searchParams.get("maxPrice") || ""}
              initialLocation={searchParams.get("location") || ""}
              initialRadius={searchParams.get("radius") || ""}
            />
          </div>
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
