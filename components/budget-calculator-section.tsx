"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type CreditTier = "excellent" | "good" | "fair" | "poor"

const CREDIT_TIERS: {
  id: CreditTier
  label: string
  apr: number
}[] = [
  {
    id: "excellent",
    label: "Excellent (780+)",
    apr: 7.49,
  },
  {
    id: "good",
    label: "Good (720–779)",
    apr: 8.99,
  },
  {
    id: "fair",
    label: "Fair (640–679)",
    apr: 11.99,
  },
  {
    id: "poor",
    label: "Poor (<640)",
    apr: 14.99,
  },
]

const TERM_OPTIONS = [
  { value: 120, label: "120 months (10 years)" },
  { value: 144, label: "144 months (12 years)" },
  { value: 180, label: "180 months (15 years)" },
  { value: 240, label: "240 months (20 years)" },
]

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export function BudgetCalculatorSection() {
  const router = useRouter()
  const [monthlyPayment, setMonthlyPayment] = useState("500")
  const [downPayment, setDownPayment] = useState("5000")
  const [termMonths, setTermMonths] = useState<number>(180)
  const [creditTier, setCreditTier] = useState<CreditTier>("excellent")

  const { totalBudget, loanAmount, apr } = useMemo(() => {
    const monthly = Number(monthlyPayment) || 0
    const down = Number(downPayment) || 0
    const term = Number(termMonths) || 0
    const tier = CREDIT_TIERS.find(t => t.id === creditTier) ?? CREDIT_TIERS[1]
    const aprValue = tier.apr

    if (monthly <= 0 || term <= 0) {
      return { totalBudget: 0, loanAmount: 0, apr: aprValue }
    }

    const monthlyRate = aprValue / 100 / 12

    let principal = 0
    if (monthlyRate === 0) {
      principal = monthly * term
    } else {
      principal = monthly * (1 - Math.pow(1 + monthlyRate, -term)) / monthlyRate
    }

    const sanitizedPrincipal = Number.isFinite(principal) ? principal : 0
    const total = sanitizedPrincipal + Math.max(0, down)

    return {
      loanAmount: sanitizedPrincipal,
      totalBudget: total,
      apr: aprValue,
    }
  }, [monthlyPayment, downPayment, termMonths, creditTier])

  const hasResult = totalBudget > 0

  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* Left: image, text, CTA */}
          <div className="flex flex-col justify-between gap-6">
            <div className="relative h-56 w-full overflow-hidden rounded-xl bg-muted sm:h-72">
              <Image
                src="/images/couple-rv.jpg"
                alt="Couple relaxing outside their RV"
                width={800}
                height={600}
                className="h-full w-full object-cover"
                priority={false}
              />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                What can I afford?
              </h2>
              <p className="text-sm text-muted-foreground sm:text-base">
                Pick a monthly payment and we&apos;ll estimate an RV price range that fits. Adjust
                the down payment, term, and credit profile to see how your budget changes.
              </p>
              <Button
                type="button"
                className="mt-1 inline-flex items-center gap-2"
                onClick={() => {
                  if (!hasResult) {
                    router.push("/?all=true")
                    return
                  }

                  const roundedBudget = Math.max(0, Math.round(totalBudget / 1000) * 1000)
                  const params = new URLSearchParams()
                  if (roundedBudget > 0) {
                    params.set("maxPrice", String(roundedBudget))
                    router.push(`/?${params.toString()}`)
                  } else {
                    router.push("/?all=true")
                  }
                }}
                >
                  <span>Shop RVs in my budget</span>
                  <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right: calculator + budget display (separate element) */}
          <div className="space-y-3">
            <div className="rounded-xl bg-card p-4 sm:p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Monthly payment
                  </label>
                  <Input
                    type="number"
                    min={0}
                    step="50"
                    placeholder="600"
                    value={monthlyPayment}
                    onChange={e => setMonthlyPayment(e.target.value)}
                    className="h-10 w-full text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Down payment
                  </label>
                  <Input
                    type="number"
                    min={0}
                    step="500"
                    placeholder="10000"
                    value={downPayment}
                    onChange={e => setDownPayment(e.target.value)}
                    className="h-10 w-full text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Term (months)
                  </label>
                  <div className="relative">
                    <select
                      className="h-10 w-full appearance-none rounded-md border border-border bg-background px-3 pr-8 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 [&::-ms-expand]:hidden"
                      value={termMonths}
                      onChange={e => setTermMonths(Number(e.target.value))}
                    >
                      {TERM_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.value}
                        </option>
                      ))}
                    </select>
                    <span
                      className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                      aria-hidden
                    >
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Credit
                  </label>
                  <div className="relative">
                    <select
                      className="h-10 w-full appearance-none rounded-md border border-border bg-background px-3 pr-8 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 [&::-ms-expand]:hidden"
                      value={creditTier}
                      onChange={e => setCreditTier(e.target.value as CreditTier)}
                    >
                      {CREDIT_TIERS.map(tier => (
                        <option key={tier.id} value={tier.id}>
                          {tier.label}
                        </option>
                      ))}
                    </select>
                    <span
                      className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                      aria-hidden
                    >
                      <ChevronDown className="h-4 w-4 shrink-0" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs text-muted-foreground sm:text-sm flex items-baseline justify-end">
              <span className="text-[0.7rem] sm:text-xs tracking-wide text-muted-foreground mr-1">
                shop up to
              </span>
              <span className="text-4xl font-bold text-foreground sm:text-5xl">
                {hasResult ? currencyFormatter.format(totalBudget) : "—"}
              </span>
              <span className="ml-2 text-[0.7rem] sm:text-xs">
                APR {apr.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

