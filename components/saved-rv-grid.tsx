"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin } from "lucide-react"
import { rvListings } from "@/lib/rv-data"
import type { RVListing } from "@/lib/rv-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

/** Demo: first 4 listings as "saved". In a real app, saved IDs would come from API/auth. */
const DEMO_SAVED_IDS = new Set(rvListings.slice(0, 4).map((l) => l.id))

export function SavedRVGrid() {
  const [savedIds, setSavedIds] = useState<Set<string>>(DEMO_SAVED_IDS)

  const savedListings = useMemo(
    () => rvListings.filter((l) => savedIds.has(l.id)),
    [savedIds]
  )

  const handleUnfavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSavedIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  if (savedListings.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <p className="font-medium text-foreground">No saved RVs</p>
          <p className="mt-1 text-sm text-muted-foreground">
            When you save listings while browsing, they&apos;ll appear here.
          </p>
          <Button variant="outline" className="mt-4" asChild>
            <Link href="/">Browse listings</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {savedListings.map((listing) => (
        <SavedRVCard
          key={listing.id}
          listing={listing}
          onUnfavorite={(e) => handleUnfavorite(listing.id, e)}
        />
      ))}
    </div>
  )
}

function SavedRVCard({
  listing,
  onUnfavorite,
}: {
  listing: RVListing
  onUnfavorite: (e: React.MouseEvent) => void
}) {
  return (
    <Link href={`/listing/${listing.id}`} className="group block">
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={listing.images[0] || "/placeholder.svg"}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            type="button"
            onClick={onUnfavorite}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/90 transition-colors hover:bg-card"
            aria-label="Remove from saved"
          >
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          </button>
        </div>
        <CardContent className="p-4">
          <div className="mb-1 text-xl font-bold text-foreground">
            ${listing.price.toLocaleString()}
          </div>
          <h3 className="mb-2 line-clamp-1 text-sm font-medium text-foreground">
            {listing.year} {listing.make} {listing.model}
          </h3>
          <div className="mb-3 text-xs text-muted-foreground">
            {listing.mileage.toLocaleString()} mi · {listing.length}ft · Sleeps {listing.sleeps}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            {listing.location}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
