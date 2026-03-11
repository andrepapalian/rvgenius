"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function SellCtaSection() {
  return (
    <section className="relative w-full border-y border-border bg-primary">
      <div className="pointer-events-none absolute inset-y-0 left-1/2 h-full w-full -translate-x-1/2 opacity-20 lg:w-1/2">
        <Image src="/images/rv-hero.jpg" alt="" fill className="object-cover" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-7xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
            Ready to sell your RV?
          </h2>
          <p className="mt-3 text-primary-foreground/90">
            List your RV in minutes. Free to list, no hidden fees—just a simple way to connect with buyers.
          </p>
          <Button size="lg" variant="secondary" className="mt-6" asChild>
            <Link href="/auth">
              List your RV for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
