"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResponsiveSelect } from "@/components/ui/responsive-select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, X, ChevronDown, CheckCircle, MapPin, ArrowUpDown } from "lucide-react"
import { filterRVs, rvTypes, getLocationDisplayLabel, type SearchFilters } from "@/lib/rv-data"
import { RVCard } from "@/components/rv-card"
import {
  yearOptions,
  sortOptions,
  sleepsOptions,
  distanceOptions,
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
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState(() => {
    if (initialMaxPrice) {
      const n = Number(initialMaxPrice)
      return Number.isFinite(n) && n > 0 ? String(n) : ""
    }
    return ""
  })
  const [minYear, setMinYear] = useState("")
  const [maxMileage, setMaxMileage] = useState("")
  const [minSleeps, setMinSleeps] = useState("")
  const [dealOnly, setDealOnly] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [locationModalZip, setLocationModalZip] = useState("")
  const [location, setLocation] = useState(initialLocation)
  const [radius, setRadius] = useState(initialRadius)

  const parsedMinPrice = useMemo(() => {
    if (!minPrice) return undefined
    const n = Number(minPrice)
    return Number.isFinite(n) && n > 0 ? n : undefined
  }, [minPrice])
  const parsedMaxPrice = useMemo(() => {
    if (!maxPrice) return undefined
    const n = Number(maxPrice)
    return Number.isFinite(n) && n > 0 ? n : undefined
  }, [maxPrice])

  const MOTORHOME_TYPES = ["class-a", "class-b", "class-c"]
  const DRIVEABLE_TYPES = ["class-a", "class-b", "class-c"]
  const TOWABLE_TYPES = ["travel-trailer", "fifth-wheel", "toy-hauler"]

  function getInitialSelectedTypes(initialType: string): string[] {
    if (!initialType || initialType === "all") return []
    if (initialType === "driveable") return [...DRIVEABLE_TYPES]
    if (initialType === "towable") return [...TOWABLE_TYPES]
    return [initialType]
  }

  const [selectedTypes, setSelectedTypes] = useState<string[]>(() =>
    getInitialSelectedTypes(initialType === "all" ? "" : initialType)
  )
  const showMileageFilter =
    selectedTypes.length === 0 || selectedTypes.some(t => MOTORHOME_TYPES.includes(t))

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (selectedTypes.length > 0) count++
    if (parsedMinPrice != null || parsedMaxPrice != null) count++
    if (minYear) count++
    if (showMileageFilter && maxMileage) count++
    if (minSleeps) count++
    if (dealOnly) count++
    if (location) count++
    if (radius) count++
    return count
  }, [selectedTypes.length, parsedMinPrice, parsedMaxPrice, minYear, maxMileage, minSleeps, dealOnly, showMileageFilter, location, radius])

  const clearAllFilters = useCallback(() => {
    setSelectedTypes([])
    setMinPrice("")
    setMaxPrice("")
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
      types: selectedTypes.length > 0 ? selectedTypes : undefined,
      minPrice: parsedMinPrice,
      maxPrice: parsedMaxPrice,
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
    selectedTypes,
    parsedMinPrice,
    parsedMaxPrice,
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

  useEffect(() => {
    if (!showMobileFilters) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [showMobileFilters])

  const priceFilterLabel =
    parsedMinPrice != null || parsedMaxPrice != null
      ? parsedMinPrice != null && parsedMaxPrice != null
        ? `$${parsedMinPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })} – $${parsedMaxPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
        : parsedMinPrice != null
          ? `From $${parsedMinPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
          : `Up to $${parsedMaxPrice!.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
      : "Price"

  const bodyTypeLabel =
    selectedTypes.length === 0
      ? "Any type"
      : selectedTypes.length === 1
        ? (rvTypes.find(t => t.value === selectedTypes[0])?.label ?? "Type")
        : "Multiple"
  const yearLabel = minYear ? `${minYear}+` : "Year"
  const distanceLabel = radius ? `Within ${radius} mi` : "Distance"
  const mileageLabel = maxMileage ? `Under ${Number(maxMileage).toLocaleString()} mi` : "Mileage"
  const sleepsLabel = minSleeps ? `${minSleeps}+ sleeps` : "Sleeps"

  const filterTriggerClass = (active: boolean) =>
    `shrink-0 gap-1 border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted ${active ? "border-primary bg-primary/5 text-primary hover:text-primary" : "border-border text-foreground hover:text-foreground"}`

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
          {/* Body Type – multi-select dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={filterTriggerClass(selectedTypes.length > 0)}>
                {bodyTypeLabel}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 p-2">
              <DropdownMenuItem onSelect={() => setSelectedTypes([])}>
                Any type
              </DropdownMenuItem>
              {rvTypes.map(t => (
                <label
                  key={t.value}
                  className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-muted"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(t.value)}
                    onChange={() => {
                      setSelectedTypes(prev =>
                        prev.includes(t.value) ? prev.filter(x => x !== t.value) : [...prev, t.value]
                      )
                    }}
                    className="h-4 w-4 rounded border-border text-primary accent-primary"
                  />
                  <span>{t.label}</span>
                </label>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Price */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={filterTriggerClass(parsedMinPrice != null || parsedMaxPrice != null)}>
                {priceFilterLabel}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 p-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-1.5 rounded-md border border-border price-range-bg pl-2">
                  <span className="text-muted-foreground">$</span>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="Min"
                    value={minPrice === "" ? "" : Number(minPrice).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    onChange={e => setMinPrice(e.target.value.replace(/\D/g, ""))}
                    className="h-8 border-0 bg-transparent shadow-none focus-visible:ring-0 tabular-nums"
                  />
                </div>
                <span className="text-muted-foreground">–</span>
                <div className="flex flex-1 items-center gap-1.5 rounded-md border border-border price-range-bg pl-2">
                  <span className="text-muted-foreground">$</span>
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="Max"
                    value={maxPrice === "" ? "" : Number(maxPrice).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    onChange={e => setMaxPrice(e.target.value.replace(/\D/g, ""))}
                    className="h-8 border-0 bg-transparent shadow-none focus-visible:ring-0 tabular-nums"
                  />
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

          {/* Distance – radius from location */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={filterTriggerClass(!!radius)}>
                {distanceLabel}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {distanceOptions.map((opt) => (
                <DropdownMenuItem
                  key={opt.value || "any"}
                  onSelect={() => setRadius(opt.value)}
                >
                  {opt.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
                    className={`rounded-md border-2 px-3 py-2 text-sm font-medium transition-colors ${minSleeps === opt.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-white text-muted-foreground hover:bg-muted/80"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* More (Deal + Mileage) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className={filterTriggerClass(dealOnly || (showMileageFilter && !!maxMileage))}>
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
              {showMileageFilter && (
                <>
                  <div className="my-1 border-t border-border" role="separator" />
                  <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">Mileage</div>
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
                </>
              )}
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
                <div className="flex items-center gap-2">
                  <div className="flex flex-1 items-center gap-1.5 rounded-md border border-border price-range-bg pl-3">
                    <span className="text-muted-foreground">$</span>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="Min"
                      value={minPrice === "" ? "" : Number(minPrice).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      onChange={e => setMinPrice(e.target.value.replace(/\D/g, ""))}
                      className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0 tabular-nums"
                    />
                  </div>
                  <span className="text-muted-foreground">–</span>
                  <div className="flex flex-1 items-center gap-1.5 rounded-md border border-border price-range-bg pl-3">
                    <span className="text-muted-foreground">$</span>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="Max"
                      value={maxPrice === "" ? "" : Number(maxPrice).toLocaleString("en-US", { maximumFractionDigits: 0 })}
                      onChange={e => setMaxPrice(e.target.value.replace(/\D/g, ""))}
                      className="h-10 border-0 bg-transparent shadow-none focus-visible:ring-0 tabular-nums"
                    />
                  </div>
                </div>
              </section>

              {/* Body Type */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Body Type</h3>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() =>
                      selectedTypes.length === rvTypes.length
                        ? setSelectedTypes([])
                        : setSelectedTypes(rvTypes.map(t => t.value))
                    }
                    className="flex items-center gap-2 text-sm text-primary hover:underline"
                  >
                    <CheckCircle className="h-4 w-4 shrink-0 text-black" />
                    {selectedTypes.length === rvTypes.length ? "Deselect All" : "Select All"}
                  </button>
                  <div className="my-2 border-b border-border" role="presentation" />
                  <div className="flex flex-col gap-0.5">
                    {rvTypes.map(t => (
                      <label
                        key={t.value}
                        className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-[0.95rem] hover:bg-muted"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTypes.includes(t.value)}
                          onChange={() => {
                            setSelectedTypes(prev =>
                              prev.includes(t.value) ? prev.filter(x => x !== t.value) : [...prev, t.value]
                            )
                          }}
                          className="h-5 w-5 rounded border-border text-primary accent-primary"
                        />
                        <span className="truncate">{t.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Year – native select for system picker on mobile */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Year</h3>
                <div className="relative">
                  <select
                    value={minYear || "any"}
                    onChange={e => setMinYear(e.target.value === "any" ? "" : e.target.value)}
                    className="w-full appearance-none rounded-md border border-border bg-muted px-3 pr-8 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring [&::-ms-expand]:hidden"
                    aria-label="Minimum year"
                  >
                    <option value="any">Any year</option>
                    {yearOptions.map(y => (
                      <option key={y} value={String(y)}>{y} or newer</option>
                    ))}
                  </select>
                  <span
                    className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                    aria-hidden
                  >
                    <ChevronDown className="h-4 w-4 shrink-0" />
                  </span>
                </div>
              </section>

              {/* Mileage – native select for system picker on mobile */}
              {showMileageFilter && (
                <section>
                  <h3 className="mb-3 text-sm font-semibold text-foreground">Mileage</h3>
                  <div className="relative">
                    <select
                      value={maxMileage || "any"}
                      onChange={e => setMaxMileage(e.target.value === "any" ? "" : e.target.value)}
                      className="w-full appearance-none rounded-md border border-border bg-muted px-3 pr-8 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring [&::-ms-expand]:hidden"
                      aria-label="Maximum mileage"
                    >
                      <option value="any">Any mileage</option>
                      <option value="5000">Under 5,000 mi</option>
                      <option value="10000">Under 10,000 mi</option>
                      <option value="25000">Under 25,000 mi</option>
                      <option value="50000">Under 50,000 mi</option>
                    </select>
                    <span
                      className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                      aria-hidden
                    >
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    </span>
                  </div>
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
                      className={`min-h-[2.75rem] rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors ${minSleeps === opt.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-white text-muted-foreground hover:bg-muted"}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </section>

              {/* Deal rating */}
              <section>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Deal Rating</h3>
                <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-[#F9F9F9] px-3 py-2.5 text-sm">
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
        <div className="mb-4 flex flex-row flex-wrap items-center justify-between gap-2">
          <div className="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <p className="text-base font-normal text-foreground">
              {sortedListings.length} {sortedListings.length === 1 ? "result" : "results"}
            </p>
            <span className="hidden h-4 w-px shrink-0 bg-border sm:inline-block" aria-hidden />
            <button
              type="button"
              onClick={() => {
                setLocationModalZip(location.replace(/\D/g, "").slice(0, 5))
                setShowLocationModal(true)
              }}
              className="inline-flex min-w-0 cursor-pointer items-center gap-1.5 text-base font-normal text-foreground underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
              aria-label="Change location"
            >
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{location ? getLocationDisplayLabel(location) : "Set location"}</span>
            </button>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <ResponsiveSelect
              value={sortBy}
              onValueChange={setSortBy}
              options={sortOptions}
              triggerClassName="h-9 w-[10rem] border-border bg-white"
              selectClassName="h-9 w-[10rem] border-border bg-white"
              triggerIcon={<ArrowUpDown className="h-4 w-4 shrink-0" />}
              ariaLabel="Sort results"
            />
          </div>
        </div>

        {/* Active filter pills */}
        {activeFilterCount > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedTypes.map(typeValue => {
              const label = rvTypes.find(t => t.value === typeValue)?.label ?? "Type"
              return (
                <span
                  key={typeValue}
                  className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {label}
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedTypes(prev => prev.filter(t => t !== typeValue))
                    }
                    aria-label={`Clear ${label}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )
            })}
            {(parsedMinPrice != null || parsedMaxPrice != null) && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {parsedMinPrice != null && parsedMaxPrice != null
                  ? `$${parsedMinPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })} – $${parsedMaxPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
                  : parsedMinPrice != null
                    ? `From $${parsedMinPrice.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
                    : `Up to $${parsedMaxPrice!.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
                <button type="button" onClick={() => { setMinPrice(""); setMaxPrice(""); }} aria-label="Clear price"><X className="h-3 w-3" /></button>
              </span>
            )}
            {radius && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Within {radius} mi
                <button type="button" onClick={() => setRadius("")} aria-label="Clear distance"><X className="h-3 w-3" /></button>
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

      {/* Location (ZIP) modal */}
      {showLocationModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/50"
            aria-hidden
            onClick={() => setShowLocationModal(false)}
          />
          <div className="relative w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
            <h2 id="location-modal-title" className="text-lg font-semibold text-foreground">
              Change location
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter a ZIP code. This is used for the distance filter.
            </p>
            <Input
              type="text"
              inputMode="numeric"
              placeholder="ZIP code"
              maxLength={5}
              value={locationModalZip}
              onChange={e => setLocationModalZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
              className="mt-4 h-10 w-full border-border bg-background px-3 text-sm tabular-nums"
              aria-label="ZIP code"
            />
            <div className="mt-6 flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowLocationModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  const zip = locationModalZip.trim()
                  setLocation(zip)
                  setShowLocationModal(false)
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
