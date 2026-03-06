"use client"

import { Suspense, useState, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ShieldCheck, Eye, Tag } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { BrowseByBodyType } from "@/components/browse-by-body-type"
import { SellCtaSection } from "@/components/sell-cta-section"
import { WhyChooseUsSection } from "@/components/why-choose-us-section"
import { FeaturedListingsSection } from "@/components/featured-listings-section"
import { SearchResultsSection } from "@/components/search-results-section"
import {
  BudgetCalculator,
  computeTotalBudget,
  formatBudgetCurrency,
  BUDGET_CALCULATOR_INTEREST_RATE,
} from "@/components/budget-calculator"
import { Button } from "@/components/ui/button"
import { filterRVs } from "@/lib/rv-data"

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedType, setSelectedType] = useState("")
  const [location, setLocation] = useState("")
  const [monthlyPayment, setMonthlyPayment] = useState(500)
  const [downPayment, setDownPayment] = useState(5000)
  const [loanTerm, setLoanTerm] = useState(120)

  const totalBudget = useMemo(
    () => computeTotalBudget(monthlyPayment, downPayment, loanTerm),
    [monthlyPayment, downPayment, loanTerm]
  )

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
      {hasSearch && <Header />}

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

        {!hasSearch && (
          <section className="border-y border-primary/30 bg-[oklch(0.20_0.01_248.82)]">
            <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
              <div className="grid grid-cols-3 gap-3 text-[0.7rem] text-primary-foreground/80 sm:text-xs lg:text-sm">
                <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-start sm:text-left sm:gap-3">
                  <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-green-500 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary-foreground sm:text-[0.7rem] lg:text-xs">
                      RV marketplace
                    </span>
                    <span className="hidden text-xs text-primary-foreground/80 sm:block">
                      Built specifically for RV buyers and sellers.
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-start sm:text-left sm:gap-3">
                  <Eye className="mt-0.5 h-6 w-6 shrink-0 text-green-500 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary-foreground sm:text-[0.7rem] lg:text-xs">
                      No account needed
                    </span>
                    <span className="hidden text-xs text-primary-foreground/80 sm:block">
                      Browse current listings without creating an account.
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-start sm:text-left sm:gap-3">
                  <Tag className="mt-0.5 h-6 w-6 shrink-0 text-green-500 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary-foreground sm:text-[0.7rem] lg:text-xs">
                      Free RV listings
                    </span>
                    <span className="hidden text-xs text-primary-foreground/80 sm:block">
                      Create and publish your RV listing with no listing fees.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {!hasSearch && (
          <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
                <div className="flex flex-col justify-center">
                  <div className="rounded-xl border border-border bg-muted/30 px-4 py-5 text-center sm:px-6 sm:py-6">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
                      Up to
                    </p>
                    <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-foreground sm:text-5xl">
                      {formatBudgetCurrency(totalBudget)}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {BUDGET_CALCULATOR_INTEREST_RATE}% · {loanTerm} mo
                    </p>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    What can I afford?
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                    Set your monthly payment and down payment—we’ll show your max budget so you can shop to it.
                  </p>
                  <Button className="mt-6 w-full gap-2" size="lg" asChild>
                    <Link href={`/?maxPrice=${totalBudget}`}>
                      Shop RVs in my budget
                      <ArrowRight className="h-5 w-5" aria-hidden />
                    </Link>
                  </Button>
                </div>
                <div>
                  <BudgetCalculator
                    monthlyPayment={monthlyPayment}
                    setMonthlyPayment={setMonthlyPayment}
                    downPayment={downPayment}
                    setDownPayment={setDownPayment}
                    loanTerm={loanTerm}
                    setLoanTerm={setLoanTerm}
                    hideResultAndCta
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {!hasSearch && <BrowseByBodyType />}

        {!hasSearch && <SellCtaSection />}

        {!hasSearch && <WhyChooseUsSection />}

        {!hasSearch && <FeaturedListingsSection listings={listings} />}

        {/* Search Results */}
        {hasSearch && (
          <div className="min-h-full bg-white">
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
