"use client"

import Image from "next/image"
import Link from "next/link"
import type { RVListing } from "@/lib/rv-data"
import { Heart, MapPin } from "lucide-react"
import { useState } from "react"

interface RVCardProps {
  listing: RVListing
}

function getDealBadge(deal?: string) {
  switch (deal) {
    case "great":
      return { label: "Great Deal", className: "bg-[#00a651] text-white" }
    case "good":
      return { label: "Good Deal", className: "bg-[#7cb342] text-white" }
    case "fair":
      return { label: "Fair Deal", className: "bg-[#fdd835] text-foreground" }
    default:
      return null
  }
}

export function RVCard({ listing }: RVCardProps) {
  const [saved, setSaved] = useState(false)
  const dealBadge = getDealBadge(listing.deal)

  return (
    <Link
      href={`/listing/${listing.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={listing.images[0] || "/placeholder.svg"}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {dealBadge && (
          <div className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-bold shadow-sm ${dealBadge.className}`}>
            {dealBadge.label}
          </div>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setSaved(!saved)
          }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 shadow-sm transition-colors hover:bg-card"
        >
          <Heart
            className={`h-4 w-4 ${saved ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 text-xl font-bold text-foreground">
          ${listing.price.toLocaleString()}
        </div>
        <h3 className="mb-2 line-clamp-1 text-sm font-medium text-foreground">
          {listing.year} {listing.make} {listing.model}
        </h3>
        <div className="mb-3 text-xs text-muted-foreground">
          {listing.mileage.toLocaleString()} mi · {listing.length}ft · Sleeps {listing.sleeps}
        </div>
        <div className="mt-auto flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {listing.location}
        </div>
      </div>
    </Link>
  )
}
