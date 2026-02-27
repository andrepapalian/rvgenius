"use client"

import { BarChart3, Shield, Wallet } from "lucide-react"

export function WhyChooseUsSection() {
  return (
    <section className="bg-card px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-2xl font-bold text-foreground">
          Why choose RVMarket?
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">Unbiased information</h3>
            <p className="text-sm text-muted-foreground">
              Deal ratings, vehicle history, and pricing data help you make the best decision.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">Largest selection</h3>
            <p className="text-sm text-muted-foreground">
              Browse the most RV inventory to find your dream vehicle at the best price.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Wallet className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">More ways to buy & sell</h3>
            <p className="text-sm text-muted-foreground">
              Get instant offers for your RV and start your purchase online.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
