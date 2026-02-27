"use client"

import Image from "next/image"
import Link from "next/link"
import { rvCategories } from "@/lib/home-data"

export function BrowseByBodyType() {
  return (
    <section className="bg-card px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-xl font-bold text-foreground sm:text-2xl">
          Browse by body type
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <Link href="/?all=true" className="group flex flex-col items-center">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-primary/30 bg-muted shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
              <Image
                src={rvCategories[0]?.image ?? "/images/rv-hero.jpg"}
                alt="All RV types"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute bottom-2 left-2 right-2 text-center text-sm font-semibold text-white drop-shadow-md">
                Any type
              </span>
            </div>
            <span className="mt-3 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
              Any type
            </span>
          </Link>
          {rvCategories.map((category) => (
            <Link
              key={category.id}
              href={`/?type=${category.id}`}
              className="group flex flex-col items-center"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl shadow-sm transition-shadow duration-300 group-hover:shadow-lg">
                <Image
                  src={category.image}
                  alt={`${category.label} RV side profile`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <span className="mt-3 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
