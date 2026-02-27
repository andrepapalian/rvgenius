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
        <div className="relative -mx-4 sm:mx-0">
          <div className="flex gap-4 overflow-x-auto overflow-y-hidden px-2 pb-4 sm:px-2 sm:pb-4 lg:px-3 lg:pb-8 scroll-smooth rv-scrollbar">
            <div className="shrink-0 w-1" aria-hidden="true" />
            {rvCategories.map((category) => (
              <Link
                key={category.id}
                href={`/?type=${category.id}`}
                className="group flex w-[72vw] sm:w-64 lg:w-80 flex-col items-stretch flex-shrink-0"
              >
                <div className="w-full h-full rounded-3xl bg-white p-4 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                  <div className="relative mx-auto h-32 w-full sm:h-40 lg:h-44 overflow-hidden rounded-3xl">
                    <Image
                      src={`/images/${category.id}-image.png`}
                      alt={`${category.label} RV side profile`}
                      fill
                      sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, 24vw"
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-4 text-center text-sm font-semibold text-foreground sm:text-base lg:text-lg">
                    {category.label}
                  </p>
                </div>
              </Link>
            ))}
            <div className="shrink-0 w-1" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}
