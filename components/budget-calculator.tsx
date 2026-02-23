"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Slider display ranges (narrower for better UX)
const MONTHLY_SLIDER_MIN = 200
const MONTHLY_SLIDER_MAX = 1500
const MONTHLY_SLIDER_STEP = 50
const DOWN_SLIDER_MIN = 0
const DOWN_SLIDER_MAX = 20000
const DOWN_SLIDER_STEP = 500

// Hard caps for typed input values
const MONTHLY_INPUT_MAX = 5000
const DOWN_INPUT_MAX = 200000

const LOAN_TERM_MONTHS = [10, 12, 15, 20].map((y) => y * 12)

function formatWithCommas(n: number): string {
  return n.toLocaleString()
}

function parsePaymentInput(value: string): number {
  const digits = value.replace(/\D/g, "")
  if (digits === "") return 0
  const noLeadingZeros = digits.replace(/^0+/, "") || "0"
  return parseInt(noLeadingZeros, 10) || 0
}

export function BudgetCalculator() {
  const [monthlyPayment, setMonthlyPayment] = useState(500)
  const [downPayment, setDownPayment] = useState(5000)
  const [loanTerm, setLoanTerm] = useState(120)
  const [interestRate] = useState(7.5)
  const [totalBudget, setTotalBudget] = useState(0)

  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12
    const loanAmount =
      monthlyPayment *
      ((1 - Math.pow(1 + monthlyRate, -loanTerm)) / monthlyRate)
    const total = loanAmount + downPayment
    setTotalBudget(Math.round(total))
  }, [monthlyPayment, downPayment, loanTerm, interestRate])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="space-y-7 sm:space-y-8">
        {/* Result - standalone */}
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Your estimated budget
          </p>
          <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight text-foreground sm:text-4xl">
            {formatCurrency(totalBudget)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {interestRate}% APR · {loanTerm / 12} year{loanTerm / 12 !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="space-y-7 sm:space-y-8">
          {/* Monthly payment */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label className="text-sm font-medium text-foreground">
                Monthly payment
              </Label>
              <div className="flex items-center rounded-lg bg-muted/80 px-3 py-2 min-w-[7rem] justify-end gap-1">
                <Input
                  type="text"
                  inputMode="numeric"
                  value={formatWithCommas(monthlyPayment)}
                  onChange={(e) =>
                    setMonthlyPayment(
                      Math.min(
                        MONTHLY_INPUT_MAX,
                        parsePaymentInput(e.target.value)
                      )
                    )
                  }
                  className="h-auto w-full max-w-[5.5rem] border-0 bg-transparent p-0 text-right text-sm font-semibold shadow-none focus-visible:ring-0 sm:text-base tabular-nums"
                  aria-label="Monthly payment in dollars"
                />
                <span className="text-xs text-muted-foreground sm:text-sm">
                  /mo
                </span>
              </div>
            </div>
            <Slider
              value={[
                Math.min(
                  MONTHLY_SLIDER_MAX,
                  Math.max(MONTHLY_SLIDER_MIN, monthlyPayment)
                ),
              ]}
              onValueChange={(v) =>
                setMonthlyPayment(Math.min(MONTHLY_INPUT_MAX, v[0]))
              }
              min={MONTHLY_SLIDER_MIN}
              max={MONTHLY_SLIDER_MAX}
              step={MONTHLY_SLIDER_STEP}
              className="cursor-pointer py-2 touch-manipulation"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(MONTHLY_SLIDER_MIN)}</span>
              <span>{formatCurrency(MONTHLY_SLIDER_MAX)}+</span>
            </div>
          </div>

          {/* Down payment */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label className="text-sm font-medium text-foreground">
                Down payment
              </Label>
              <div className="flex items-center rounded-lg bg-muted/80 px-3 py-2 min-w-[7rem] justify-end">
                <Input
                  type="text"
                  inputMode="numeric"
                  value={formatWithCommas(downPayment)}
                  onChange={(e) =>
                    setDownPayment(
                      Math.min(
                        DOWN_INPUT_MAX,
                        parsePaymentInput(e.target.value)
                      )
                    )
                  }
                  className="h-auto w-full max-w-[6rem] border-0 bg-transparent p-0 text-right text-sm font-semibold shadow-none focus-visible:ring-0 sm:text-base tabular-nums"
                  aria-label="Down payment in dollars"
                />
              </div>
            </div>
            <Slider
              value={[
                Math.min(
                  DOWN_SLIDER_MAX,
                  Math.max(DOWN_SLIDER_MIN, downPayment)
                ),
              ]}
              onValueChange={(v) =>
                setDownPayment(Math.min(DOWN_INPUT_MAX, v[0]))
              }
              min={DOWN_SLIDER_MIN}
              max={DOWN_SLIDER_MAX}
              step={DOWN_SLIDER_STEP}
              className="cursor-pointer py-2 touch-manipulation"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(DOWN_SLIDER_MIN)}</span>
              <span>{formatCurrency(DOWN_SLIDER_MAX)}+</span>
            </div>
          </div>

          {/* Loan term */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Loan term
            </Label>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {LOAN_TERM_MONTHS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLoanTerm(term)}
                  className={`
                    rounded-xl px-3 py-3 text-sm font-semibold transition-all
                    touch-manipulation min-h-[2.75rem]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    ${
                      loanTerm === term
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "bg-muted/80 text-muted-foreground hover:bg-muted"
                    }
                  `}
                >
                  {term / 12} yr
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <Button className="w-full gap-2" size="lg" asChild>
            <Link href={`/?maxPrice=${totalBudget}`}>
              Shop RVs in my budget
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </Button>
        </div>
    </div>
  )
}
