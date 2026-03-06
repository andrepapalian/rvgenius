"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResponsiveSelect } from "@/components/ui/responsive-select"
import { Search, X } from "lucide-react"
import { rvTypes } from "@/lib/rv-data"

const typeOptions = [
  { value: "all", label: "All Types" },
  ...rvTypes.map((t) => ({ value: t.value, label: t.label })),
]

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [type, setType] = useState(searchParams.get("type") || "all")
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (type && type !== "all") params.set("type", type)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    
    router.push(`/?${params.toString()}`)
  }

  const handleClear = () => {
    setQuery("")
    setType("all")
    setMinPrice("")
    setMaxPrice("")
    router.push("/")
  }

  const hasFilters = query || (type && type !== "all") || minPrice || maxPrice

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search make, model, or keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10 bg-background"
          />
        </div>
        
        {/* Type Select */}
        <ResponsiveSelect
          value={type}
          onValueChange={setType}
          options={typeOptions}
          placeholder="All Types"
          triggerClassName="w-full bg-background lg:w-44"
          ariaLabel="RV type"
        />

        {/* Price Range */}
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-24 bg-background"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-24 bg-background"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={handleSearch} className="flex-1 lg:flex-none">
            Search
          </Button>
          {hasFilters && (
            <Button variant="ghost" size="icon" onClick={handleClear} className="text-muted-foreground">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
