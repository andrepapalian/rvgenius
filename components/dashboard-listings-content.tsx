"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, ExternalLink, Pencil, MapPin } from "lucide-react"
import type { RVListing } from "@/lib/rv-data"

/** Set to true to demo listing cards; would come from API in a real app. */
const DEMO_MY_LISTINGS: RVListing[] = []

export function DashboardListingsContent() {
  const listings = DEMO_MY_LISTINGS
  const hasListings = listings.length > 0

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Listings</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your RV listings, view analytics, and create new ones.
          </p>
        </div>
        {hasListings && (
          <Button asChild>
            <Link href="/dashboard/create">
              <PlusCircle className="mr-2 size-4" />
              Create Listing
            </Link>
          </Button>
        )}
      </div>

      {hasListings ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <DashboardListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card px-6 py-10 text-center">
          <p className="font-medium text-foreground">Your listings</p>
          <p className="mt-1 text-sm text-muted-foreground">
            You don&apos;t have any active listings yet. Create one to get started.
          </p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/create">List my RV</Link>
          </Button>
        </div>
      )}
    </>
  )
}

function DashboardListingCard({ listing }: { listing: RVListing }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-muted">
        <Image
          src={listing.images[0] || "/placeholder.svg"}
          alt={listing.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-4">
        <div className="mb-1 text-xl font-bold text-foreground">
          ${listing.price.toLocaleString()}
        </div>
        <h3 className="mb-2 line-clamp-1 text-sm font-medium text-foreground">
          {listing.year} {listing.make} {listing.model}
        </h3>
        <div className="mb-3 text-xs text-muted-foreground">
          {listing.mileage.toLocaleString()} mi · {listing.length}ft · Sleeps {listing.sleeps}
        </div>
        <div className="mb-4 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          {listing.location}
        </div>
        <div className="mt-auto flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/listing/${listing.id}`}>
              <ExternalLink className="mr-1.5 size-4" />
              View
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href="/dashboard/create">
              <Pencil className="mr-1.5 size-4" />
              Modify
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
