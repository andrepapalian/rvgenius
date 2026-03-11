"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeroSectionProps {
  selectedType: string
  location: string
  onTypeChange: (value: string) => void
  onLocationChange: (value: string) => void
  onSearch: () => void
}

const TYPE_OPTIONS = [
  {
    value: "all",
    label: "All RVs",
  },
  {
    value: "driveable",
    label: "Driveables",
  },
  {
    value: "towable",
    label: "Towables",
  },
] as const

export function HeroSection(props: HeroSectionProps) {
  const { selectedType, location, onTypeChange, onLocationChange, onSearch } = props

  const searchLabel = "Search RVs"

  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-6 sm:flex sm:flex-col sm:items-center sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Mobile & tablet layout: stacked content */}
        <div className="flex w-full flex-col px-0 text-center sm:text-left lg:hidden">
          {/* Title */}
          <h1 className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-6 text-4xl font-extrabold tracking-tight text-foreground [animation-delay:100ms]">
            <span className="block">
              Find your{" "}
              <span className="inline-block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                dream
              </span>{" "}
              RV.
            </span>
          </h1>

          {/* Card: type select + location input + search button (mobile & tablet) */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-5 w-full rounded-md bg-white px-4 py-4 shadow-lg [animation-delay:200ms]">
            <div className="relative">
              <select
                value={selectedType || "all"}
                onChange={e => onTypeChange(e.target.value)}
                aria-label="RV type"
                className="h-14 w-full min-w-0 appearance-none rounded-md border border-border bg-background px-3 pr-9 text-left text-lg"
              >
                {TYPE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <span
                className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground/80"
                aria-hidden
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.085l3.71-3.854a.75.75 0 1 1 1.08 1.04l-4.25 4.417a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>

            <Input
              value={location}
              onChange={e => onLocationChange(e.target.value)}
              placeholder="ZIP code"
              inputMode="numeric"
              maxLength={5}
              className="mt-4 h-14 w-full min-w-0 flex-1 border-border text-lg bg-background"
            />

            <Button onClick={onSearch} className="mt-4 flex h-14 w-full items-center justify-center text-lg">
              {searchLabel}
            </Button>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-5 [animation-delay:300ms] lg:hidden">
            <p className="text-center text-sm text-muted-foreground">
              Selling an RV?{" "}
              <Link
                href="/auth"
                className="font-medium text-[rgb(245,158,11)] underline underline-offset-4 hover:text-[rgb(245,158,11)]"
              >
                List it for free
              </Link>{" "}
              and reach serious buyers.
            </p>
          </div>

          {/* Image stacked below content on mobile & tablet */}
          <div className="mt-6">
            <div className="relative h-56 w-full rounded-md bg-muted overflow-hidden sm:h-64 select-none">
              <Image
                src="/images/hero-background-image.png"
                alt="Scenic wooded campsite with RV surrounded by trees"
                fill
                className="object-contain [object-position:center]"
                draggable={false}
                onContextMenu={e => e.preventDefault()}
                priority
              />
            </div>
          </div>
        </div>

        {/* Desktop layout: stacked hero, centered */}
        <div className="hidden lg:mt-10 lg:flex lg:w-full lg:max-w-7xl lg:flex-col lg:items-center lg:gap-10">
          {/* Text, form, selling message */}
          <div className="space-y-6 text-center max-w-2xl">
            <div>
              <h1 className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem] xl:text-[2.9rem] xl:leading-[1.1] [animation-delay:100ms]">
                <span className="block">
                  Find your{" "}
                  <span className="inline-block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    dream
                  </span>{" "}
                  RV.
                </span>
              </h1>
              <p className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-4 text-base text-muted-foreground [animation-delay:200ms] sm:mt-5">
                Find the perfect RV or list yours for sale—simple and transparent.
              </p>
            </div>

            <div className="mx-auto max-w-xl rounded-md bg-white px-4 py-5 shadow-lg">
              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 items-stretch">
                <div className="relative">
                  <select
                    value={selectedType || "all"}
                    onChange={e => onTypeChange(e.target.value)}
                    aria-label="RV type"
                    className="h-12 w-full min-w-0 appearance-none rounded-md border border-border bg-background px-3 pr-9 text-left text-base"
                  >
                    {TYPE_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <span
                    className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground/80"
                    aria-hidden
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.085l3.71-3.854a.75.75 0 1 1 1.08 1.04l-4.25 4.417a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <Input
                  value={location}
                  onChange={e => onLocationChange(e.target.value)}
                  placeholder="ZIP code"
                  inputMode="numeric"
                  maxLength={5}
                  className="h-12 w-full min-w-0 border-border bg-background text-base"
                />
                <Button
                  onClick={onSearch}
                  className="flex h-12 w-full items-center justify-center text-base"
                >
                  {searchLabel}
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Selling an RV?{" "}
              <Link
                href="/auth"
                className="font-medium text-[rgb(245,158,11)] underline-offset-4 hover:underline hover:text-[rgb(245,158,11)]"
              >
                List it for free
              </Link>{" "}
              and reach serious buyers.
            </p>
          </div>

          {/* Hero image stacked below on desktop */}
          <div className="relative w-full max-w-xl">
            <div className="relative h-64 w-full rounded-md bg-muted lg:h-80 overflow-hidden select-none">
              <Image
                src="/images/hero-background-image.png"
                alt="Scenic wooded campsite with RV surrounded by trees"
                fill
                className="object-contain [object-position:center]"
                draggable={false}
                onContextMenu={e => e.preventDefault()}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
