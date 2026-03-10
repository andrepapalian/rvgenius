"use client"

import Link from "next/link"
import { RVCard } from "@/components/rv-card"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { RVListing } from "@/lib/rv-data"

interface FeaturedListingsSectionProps {
  listings: RVListing[]
}

export function FeaturedListingsSection({ listings }: FeaturedListingsSectionProps) {
  const featured = listings.slice(0, 12)

  return (
    <section className="bg-[#F9F9F9] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Featured RVs near you</h2>
          <Link href="/?all=true" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {featured.map((listing) => (
              <CarouselItem
                key={listing.id}
                className="pl-4 basis-full sm:basis-1/2 lg:basis-1/4"
              >
                <RVCard listing={listing} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselDots />
        </Carousel>
      </div>
    </section>
  )
}
