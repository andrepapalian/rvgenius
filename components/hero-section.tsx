"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Rows3 } from "lucide-react"
import { Header } from "@/components/header"

interface HeroSectionProps {
  selectedType: string
  location: string
  onTypeChange: (value: string) => void
  onLocationChange: (value: string) => void
  onSearch: () => void
}

const DriveableIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M19.5 7.5v0.429c0 3.335 1.288 4.215 4 5.571v5H21m-1.5 -11h2V7s-1.5 -1 -2 -2.5H0.5v14h2m17 -11h-5v4h6.019M16 18.5a2.5 2.5 0 0 0 5 0m-5 0a2.5 2.5 0 0 1 5 0m-5 0H7.5m-5 0a2.5 2.5 0 0 0 5 0m-5 0a2.5 2.5 0 0 1 5 0m4 -7v-4h-8v4h8Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const TowableIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M18.5 18.5H24m-5.5 0v-14h-15S0.5 9 0.5 16.616V18.5H7m11.5 0H12m9 2h3m-17 -2a2.5 2.5 0 0 0 5 0m-5 0a2.5 2.5 0 0 1 5 0m-2 -11v4m-6 0a23.99 23.99 0 0 1 1.172 -4H15.5v4H4Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const TYPE_OPTIONS = [
  {
    value: "all",
    label: "All RVs",
    icon: Rows3,
  },
  {
    value: "driveable",
    label: "Driveables",
    icon: DriveableIcon,
  },
  {
    value: "towable",
    label: "Towables",
    icon: TowableIcon,
  },
] as const

interface HeroTypeTabsRowProps {
  selectedType: string
  onTypeChange: (value: string) => void
  wrapperClassName?: string
  buttonClassName?: string
}

function HeroTypeTabsRow({
  selectedType,
  onTypeChange,
  wrapperClassName = "",
  buttonClassName = "",
}: HeroTypeTabsRowProps) {
  return (
    <div className={wrapperClassName}>
      {TYPE_OPTIONS.map(option => {
        const Icon = option.icon
        const isActive =
          (!selectedType && option.value === "all") || selectedType === option.value

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onTypeChange(option.value)}
            className={`flex flex-1 flex-col items-center justify-center gap-1 px-3 pb-2 pt-1 text-sm font-medium transition-colors sm:text-sm ${
              isActive
                ? "text-primary sm:border-b-2 sm:border-primary"
                : "text-muted-foreground hover:text-foreground sm:border-b-2 sm:border-transparent"
            } ${buttonClassName}`}
          >
            <Icon className={`h-7 w-7 sm:h-7 sm:w-7 ${isActive ? "text-primary" : ""}`} />
            <span>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export function HeroSection(props: HeroSectionProps) {
  const { selectedType, location, onTypeChange, onLocationChange, onSearch } = props

  const searchLabel =
    selectedType === "driveable"
      ? "Search Driveables"
      : selectedType === "towable"
        ? "Search Towables"
        : "Search RVs"

  return (
    <section className="relative overflow-hidden bg-white sm:bg-background">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-background-image.png"
          alt="Scenic wooded campsite with RV surrounded by trees"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Darken background slightly on mobile for readability */}
      <div className="absolute inset-0 bg-black/30 sm:bg-transparent" />

      {/* Header inside hero so background flows as one section */}
      <Header variant="home" />

      <div className="relative mx-auto max-w-7xl px-0 pb-10 pt-6 sm:flex sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        {/* Mobile layout: no card, full-width content */}
        <div className="flex w-full flex-col px-4 text-center sm:hidden">
          {/* Title */}
          <h1 className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-6 text-4xl font-extrabold tracking-tight text-white [animation-delay:100ms]">
            <span className="block">
              Find Your{" "}
              <span className="inline-block text-white">
                Perfect
              </span>{" "}
              RV.
            </span>
          </h1>

          {/* Tabs between title and search controls, same width as input */}
          <div className="mt-5 w-full">
            <div className="mx-auto w-full rounded-md bg-white/95 px-1 py-1 shadow-sm">
              <HeroTypeTabsRow
                selectedType={selectedType}
                onTypeChange={onTypeChange}
                wrapperClassName="flex w-full justify-between gap-0"
              />
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-4 [animation-delay:300ms]">
            <div className="w-full">
              <Input
                value={location}
                onChange={e => onLocationChange(e.target.value)}
                placeholder="City, State or ZIP"
                className="h-14 w-full min-w-0 flex-1 border-border bg-white text-lg"
              />

              <Button onClick={onSearch} className="mt-4 flex h-14 w-full items-center justify-center text-lg">
                {searchLabel}
              </Button>
            </div>

            <p className="mt-5 text-center text-sm text-white">
              Selling an RV?{" "}
              <Link href="/dashboard" className="font-medium underline underline-offset-4">
                List it for free
              </Link>{" "}
              and reach serious buyers.
            </p>
          </div>
        </div>

        {/* Desktop / tablet layout: card */}
        <div className="hidden sm:mx-0 sm:flex sm:max-w-2xl sm:flex-col sm:justify-center sm:rounded-3xl sm:bg-white sm:px-6 sm:py-8 sm:text-left sm:shadow-lg">
          <h1 className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem] xl:text-[2.9rem] xl:leading-[1.1] [animation-delay:100ms]">
            <span className="block">
              Find Your{" "}
              <span className="inline-block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Perfect
              </span>{" "}
              RV.
            </span>
          </h1>

          <p className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-4 max-w-lg text-lg text-muted-foreground [animation-delay:200ms] sm:mt-5">
            Find your perfect RV or list yours for sale—simple and transparent.
          </p>

          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both mt-6 sm:mt-8 [animation-delay:300ms]">
            <div className="mx-auto w-full sm:max-w-xl sm:mx-0">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex flex-col gap-2">
                  <HeroTypeTabsRow
                    selectedType={selectedType}
                    onTypeChange={onTypeChange}
                    wrapperClassName="inline-flex w-full justify-between gap-0 border-b border-border/20 sm:border-none"
                  />
                </div>

                <Input
                  value={location}
                  onChange={e => onLocationChange(e.target.value)}
                  placeholder="City, State or ZIP"
                  className="h-12 w-full min-w-0 flex-1 border-border bg-muted text-base"
                />
              </div>

              <Button onClick={onSearch} className="mt-3 flex h-12 w-full items-center justify-center text-base">
                {searchLabel}
              </Button>
            </div>

            <p className="mt-5 text-left text-sm text-muted-foreground">
              Selling an RV?{" "}
              <Link href="/dashboard" className="font-medium text-primary underline-offset-4 hover:underline">
                List it for free
              </Link>{" "}
              and reach serious buyers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
