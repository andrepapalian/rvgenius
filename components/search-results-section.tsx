"use client"

import { useState, useMemo, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, X, ChevronDown } from "lucide-react"
import { filterRVs, rvTypes, type SearchFilters } from "@/lib/rv-data"
import { RVCard } from "@/components/rv-card"
import {
  PRICE_PRESETS,
  MAX_PRICE_PRESETS,
  yearOptions,
  sortOptions,
  sleepsOptions,
} from "@/lib/home-data"

export function SearchResultsSection({
  initialType,
  initialQuery,
  initialMaxPrice,
  initialLocation,
  initialRadius,
}: {
  initialType: string
  initialQuery: string
  initialMaxPrice: string
  initialLocation: string
  initialRadius: string
}) {
  const router = useRouter()
  const [searchText, setSearchText] = useState(initialQuery)
  const [selectedType, setSelectedType] = useState(initialType)
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState(() => {
    if (initialMaxPrice) {
      const n = Number(initialMaxPrice)
      return Number.isFinite(n) && n > 0 ? String(n) : ""
    }
    return ""
  })
  const [appliedMinPrice, setAppliedMinPrice] = useState<number | undefined>(undefined)
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | undefined>(() => {
    if (initialMaxPrice) {
      const n = Number(initialMaxPrice)
      return Number.isFinite(n) && n > 0 ? n : undefined
    }
    return undefined
  })
  const [minYear, setMinYear] = useState("")
  const [maxMileage, setMaxMileage] = useState("")
  const [minSleeps, setMinSleeps] = useState("")
  const [dealOnly, setDealOnly] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [location, setLocation] = useState(initialLocation)
  const [radius, setRadius] = useState(initialRadius)

  const applyPriceFilter = useCallback(() => {
    const min = minPrice ? Number(minPrice) : undefined
    const max = maxPrice ? Number(maxPrice) : undefined
    setAppliedMinPrice(min != null && min > 0 && Number.isFinite(min) ? min : undefined)
    setAppliedMaxPrice(max != null && max > 0 && Number.isFinite(max) ? max : undefined)
  }, [minPrice, maxPrice])

  const resetPriceFilter = useCallback(() => {
    setMinPrice("")
    setMaxPrice("")
    setAppliedMinPrice(undefined)
    setAppliedMaxPrice(undefined)
  }, [])

  const MOTORHOME_TYPES = ["class-a", "class-b", "class-c"]
  const showMileageFilter = !selectedType || MOTORHOME_TYPES.includes(selectedType)

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (selectedType) count++
    if (appliedMinPrice != null || appliedMaxPrice != null) count++
    if (minYear) count++
    if (showMileageFilter && maxMileage) count++
    if (minSleeps) count++
    if (dealOnly) count++
    if (location) count++
    if (radius) count++
    return count
  }, [selectedType, appliedMinPrice, appliedMaxPrice, minYear, maxMileage, minSleeps, dealOnly, showMileageFilter])

  const clearAllFilters = useCallback(() => {
    setSelectedType("")
    setMinPrice("")
    setMaxPrice("")
    setAppliedMinPrice(undefined)
    setAppliedMaxPrice(undefined)
    setMinYear("")
    setMaxMileage("")
    setMinSleeps("")
    setDealOnly(false)
    setSearchText("")
    setLocation("")
    setRadius("")
    router.replace("/?all=true", { scroll: false })
  }, [router])

  const filteredListings = useMemo(() => {
    const filters: SearchFilters = {
      query: searchText || undefined,
      type: selectedType || undefined,
      minPrice: appliedMinPrice,
      maxPrice: appliedMaxPrice,
      location: location || undefined,
      radiusMiles: radius ? Number(radius) : undefined,
      minYear: minYear ? Number(minYear) : undefined,
      maxMileage: showMileageFilter && maxMileage ? Number(maxMileage) : undefined,
      minSleeps: minSleeps ? Number(minSleeps) : undefined,
      dealOnly: dealOnly || undefined,
    }
    return filterRVs(filters)
  }, [
    searchText,
    selectedType,
    appliedMinPrice,
    appliedMaxPrice,
    location,
    radius,
    minYear,
    maxMileage,
    minSleeps,
    dealOnly,
    showMileageFilter,
  ])

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

  const priceFilterLabel =
    appliedMinPrice != null || appliedMaxPrice != null
      ? appliedMinPrice != null && appliedMaxPrice != null
        ? `$${appliedMinPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })} – $${appliedMaxPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
        : appliedMinPrice != null
          ? `From $${appliedMinPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
          : `Up to $${appliedMaxPrice!.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
      : "Price"

  const bodyTypeLabel = selectedType ? rvTypes.find(t => t.value === selectedType)?.label ?? "Body Type" : "Any type"
  const yearLabel = minYear ? `${minYear}+` : "Year"
  const mileageLabel = maxMileage ? `Under ${Number(maxMileage).toLocaleString()} mi` : "Mileage"
  const sleepsLabel = minSleeps ? `${minSleeps}+ sleeps` : "Sleeps"

  const filterTriggerClass = (active: boolean) =>
    `shrink-0 gap-1 border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${active ? "border-primary bg-primary/5 text-primary" : "border-border text-foreground"}`

  return (
    <>
      {/* Zillow-style filter bar – full width under navbar */}
      <div className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 sm:gap-3 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="relative min-w-0 flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Make, model, location…"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="h-9 bg-white pl-9"
            />
          </div>

          {/* Mobile: single "More" button opens full-screen filters */}
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="outline"
              size="sm"
              className={filterTriggerClass(activeFilterCount > 0)}
              onClick={() => setShowMobileFilters(true)}
            >
              More
              <ChevronDown className="h-4 w-4" />
            </Button>
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-1 text-muted-foreground">
                <X className="h-3 w-3" /> Clear all
              </Button>
            )}
          </div>

          {/* Desktop: individual filter dropdowns */}
          <div className="hidden flex-wrap items-center gap-2 lg:flex lg:gap-3">
          {/* Body Type – single dropdown with options (no nested Select) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={filterTriggerClass(!!selectedType)}>
                {bodyTypeLabel}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onSelect={() => setSelectedType("")}>
                Any type
              </DropdownMenuItem>
              {rvTypes.map(t => (
                <DropdownMenuItem key={t.value} onSelect={() => setSelectedType(t.value)}>
                  {t.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={filterTriggerClass(appliedMinPrice != null || appliedMaxPrice != null)}>
                {priceFilterLabel}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex flex-1 items-center gap-1 rounded-md border border-border bg-muted">
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="Min"
                      value={minPrice === "" ? "" : `$${Number(minPrice).toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                      onChange={e => setMinPrice(e.target.value.replace(/\D/g, ""))}
                      className="h-8 border-0 bg-transparent shadow-none focus-visible:ring-0 tabular-nums"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button type="button" variant="ghost" size="icon" className="h-7 w-7 shrink-0" aria-label="Min presets">
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-[8rem]">
                        {PRICE_PRESETS.map(p => (
                          <DropdownMenuItem key={p.value || "none"} onSelect={() => setMinPrice(p.value)}>{p.label}</DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <span className="text-muted-foreground">–</span>
                  <div className="flex flex-1 items-center gap-1 rounded-md border border-border bg-muted">
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="Max"
                      value={maxPrice === "" ? "" : `$${Number(maxPrice).toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                      onChange={e => setMaxPrice(e.target.value.replace(/\D/g, ""))}
                      className="h-8 border-0 bg-transparent shadow-none focus-visible:ring-0 tabular-nums"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button type="button" variant="ghost" size="icon" className="h-7 w-7 shrink-0" aria-label="Max presets">
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-[8rem]">
                        {MAX_PRICE_PRESETS.map(p => (
                          <DropdownMenuItem key={p.value || "none"} onSelect={() => setMaxPrice(p.value)}>{p.label}</DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="button" size="sm" onClick={applyPriceFilter} className="flex-1">Apply</Button>
                  <Button type="button" size="sm" variant="outline" onClick={resetPriceFilter} className="flex-1">Reset</Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Year */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={filterTriggerClass(!!minYear)}>
                {yearLabel}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem onSelect={() => setMinYear("")}>
                Any year
              </DropdownMenuItem>
              {yearOptions.map(y => (
                <DropdownMenuItem key={y} onSelect={() => setMinYear(String(y))}>
                  {y} or newer
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mileage – only when motorhome type or any type */}
          {showMileageFilter && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className={filterTriggerClass(!!maxMileage)}>
                  {mileageLabel}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onSelect={() => setMaxMileage("")}>
                  Any mileage
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setMaxMileage("5000")}>
                  Under 5,000 mi
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setMaxMileage("10000")}>
                  Under 10,000 mi
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setMaxMileage("25000")}>
                  Under 25,000 mi
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setMaxMileage("50000")}>
                  Under 50,000 mi
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Sleeps – Zillow-style tab selection */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={filterTriggerClass(!!minSleeps)}>
                {sleepsLabel}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-auto p-2">
              <div className="flex flex-wrap gap-1.5">
                {sleepsOptions.map((opt) => (
                  <button
                    key={opt.value || "any"}
                    type="button"
                    onClick={() => setMinSleeps(opt.value)}
                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${minSleeps === opt.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* More (Deal) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={filterTriggerClass(dealOnly)}>
                More
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 p-2">
              <label className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted">
                <input
                  type="checkbox"
                  checked={dealOnly}
                  onChange={e => setDealOnly(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary accent-primary"
                />
                <span>Show deals only</span>
              </label>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Clear all (desktop) */}
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="ml-auto gap-1 text-muted-foreground">
              <X className="h-3 w-3" /> Clear all
            </Button>
          )}
          </div>
        </div>
      </div>

      {/* Mobile full-screen filter panel (Zillow-style) */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex flex-col bg-card lg:hidden">
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-4">
            <h2 className="text-lg font-semibold text-foreground">
              {sortedListings.length} {sortedListings.length === 1 ? "Result" : "Results"}
            </h2>
            <button
              type="button"
              onClick={() => setShowMobileFilters(false)}
              className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
            <div className="space-y-8">
              {/* Price Range */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-1 items-center gap-1 rounded-md border border-border bg-muted">
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Min"
                        value={minPrice === "" ? "" : `$${Number(minPrice).toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                        onChange={e => setMinPrice(e.target.value.replace(/\D/g, ""))}
                        className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0 tabular-nums"
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0" aria-label="Min presets">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[8rem]">
                          {PRICE_PRESETS.map(p => (
                            <DropdownMenuItem key={p.value || "none"} onSelect={() => setMinPrice(p.value)}>{p.label}</DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <span className="text-muted-foreground">–</span>
                    <div className="flex flex-1 items-center gap-1 rounded-md border border-border bg-muted">
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="Max"
                        value={maxPrice === "" ? "" : `$${Number(maxPrice).toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                        onChange={e => setMaxPrice(e.target.value.replace(/\D/g, ""))}
                        className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0 tabular-nums"
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0" aria-label="Max presets">
                            <ChevronDown className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="min-w-[8rem]">
                          {MAX_PRICE_PRESETS.map(p => (
                            <DropdownMenuItem key={p.value || "none"} onSelect={() => setMaxPrice(p.value)}>{p.label}</DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="button" size="sm" onClick={applyPriceFilter} className="flex-1">Apply</Button>
                    <Button type="button" size="sm" variant="outline" onClick={resetPriceFilter} className="flex-1">Reset</Button>
                  </div>
                </div>
              </section>

              {/* Body Type */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Body Type</h3>
                <Select value={selectedType || "any"} onValueChange={v => setSelectedType(v === "any" ? "" : v)}>
                  <SelectTrigger className="w-full border-border bg-muted">
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any type</SelectItem>
                    {rvTypes.map(t => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </section>

              {/* Year */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Year</h3>
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
              </section>

              {/* Mileage – only when motorhome type or any type */}
              {showMileageFilter && (
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">Mileage</h3>
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
                </section>
              )}

              {/* Sleeps – Zillow-style tab selection (like Bedrooms) */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Sleeps</h3>
                <div className="flex flex-wrap gap-2">
                  {sleepsOptions.map((opt) => (
                    <button
                      key={opt.value || "any"}
                      type="button"
                      onClick={() => setMinSleeps(opt.value)}
                      className={`min-h-[2.75rem] rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${minSleeps === opt.value ? "bg-primary text-primary-foreground" : "border border-border bg-muted/80 text-muted-foreground hover:bg-muted"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Deal rating */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Deal Rating</h3>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={dealOnly}
                    onChange={e => setDealOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary accent-primary"
                  />
                  <span className="text-foreground">Show deals only</span>
                </label>
              </section>
            </div>
          </div>
          <div className="shrink-0 border-t border-border p-4 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={clearAllFilters}>
              Clear all
            </Button>
            <Button className="flex-1" onClick={() => setShowMobileFilters(false)}>
              Show {sortedListings.length} results
            </Button>
          </div>
        </div>
      )}

      {/* Results content – full width, no sidebar */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-foreground">Search Results</h1>
          <div className="flex items-center gap-3">
            <p className="text-sm text-muted-foreground">
              {sortedListings.length} {sortedListings.length === 1 ? "RV" : "RVs"} found
            </p>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-9 w-[10rem] border-border bg-white">
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

        {/* Active filter pills */}
        {activeFilterCount > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedType && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {rvTypes.find(t => t.value === selectedType)?.label}
                <button type="button" onClick={() => setSelectedType("")}><X className="h-3 w-3" /></button>
              </span>
            )}
            {(appliedMinPrice != null || appliedMaxPrice != null) && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {appliedMinPrice != null && appliedMaxPrice != null
                  ? `$${appliedMinPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })} – $${appliedMaxPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
                  : appliedMinPrice != null
                    ? `From $${appliedMinPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
                    : `Up to $${appliedMaxPrice!.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                <button type="button" onClick={() => { setMinPrice(""); setMaxPrice(""); setAppliedMinPrice(undefined); setAppliedMaxPrice(undefined); }} aria-label="Clear price"><X className="h-3 w-3" /></button>
              </span>
            )}
            {minYear && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {minYear}+ year
                <button type="button" onClick={() => setMinYear("")}><X className="h-3 w-3" /></button>
              </span>
            )}
            {showMileageFilter && maxMileage && (
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

        {sortedListings.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {sortedListings.map(listing => (
              <RVCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="text-lg font-medium text-foreground">No RVs match your filters</p>
            <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters</p>
            <Button className="mt-4" onClick={clearAllFilters}>Clear all filters</Button>
          </div>
        )}
      </section>
    </>
  )
}
