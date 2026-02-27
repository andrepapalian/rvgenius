"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function SellCtaSection() {
  return (
    <section className="bg-card px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl bg-primary">
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
            <Image src="/images/rv-hero.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="relative z-10 p-8 lg:p-12">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
                Ready to sell your RV?
              </h2>
              <p className="mt-3 text-primary-foreground/90">
                List your RV in minutes. Free to list, no hidden fees—just a simple way to connect with buyers.
              </p>
              <Button size="lg" variant="secondary" className="mt-6" asChild>
                <Link href="/dashboard">
                  List your RV for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
