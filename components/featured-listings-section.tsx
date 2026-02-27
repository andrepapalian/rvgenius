"use client"

import Link from "next/link"
import { RVCard } from "@/components/rv-card"
import type { RVListing } from "@/lib/rv-data"

interface FeaturedListingsSectionProps {
  listings: RVListing[]
}

export function FeaturedListingsSection({ listings }: FeaturedListingsSectionProps) {
  return (
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
  )
}
