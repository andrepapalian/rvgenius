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
const MONTHLY_SLIDER_STEP = 25
const DOWN_SLIDER_MIN = 0
const DOWN_SLIDER_MAX = 20000
const DOWN_SLIDER_STEP = 250

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

/** Native range input for reliable touch dragging on mobile; styled like desktop Radix slider */
function NativeBudgetRange({
  value,
  min,
  max,
  setValue,
  ariaLabel,
  inputMax,
}: {
  value: number
  min: number
  max: number
  setValue: (n: number) => void
  ariaLabel: string
  inputMax: number
}) {
  const clamped = Math.min(max, Math.max(min, value))
  const percent = max > min ? ((clamped - min) / (max - min)) * 100 : 0
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={1}
      value={clamped}
      onChange={(e) => setValue(Math.min(inputMax, Number(e.target.value)))}
      aria-label={ariaLabel}
      className="range-native w-full touch-manipulation cursor-pointer"
      style={{ "--value-percent": `${percent}%` } as React.CSSProperties & { "--value-percent": string }}
    />
  )
}

export const BUDGET_CALCULATOR_INTEREST_RATE = 7.5
const INTEREST_RATE = BUDGET_CALCULATOR_INTEREST_RATE

export function computeTotalBudget(
  monthlyPayment: number,
  downPayment: number,
  loanTerm: number,
  interestRate: number = INTEREST_RATE
): number {
  const monthlyRate = interestRate / 100 / 12
  const loanAmount =
    monthlyPayment *
    ((1 - Math.pow(1 + monthlyRate, -loanTerm)) / monthlyRate)
  return Math.round(loanAmount + downPayment)
}

export function formatBudgetCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export type BudgetCalculatorProps = {
  /** When provided, component is controlled and does not render result card or CTA */
  monthlyPayment?: number
  setMonthlyPayment?: (n: number) => void
  downPayment?: number
  setDownPayment?: (n: number) => void
  loanTerm?: number
  setLoanTerm?: (n: number) => void
  hideResultAndCta?: boolean
}

export function BudgetCalculator({
  monthlyPayment: controlledMonthly,
  setMonthlyPayment: setControlledMonthly,
  downPayment: controlledDown,
  setDownPayment: setControlledDown,
  loanTerm: controlledTerm,
  setLoanTerm: setControlledTerm,
  hideResultAndCta = false,
}: BudgetCalculatorProps = {}) {
  const [internalMonthly, setInternalMonthly] = useState(500)
  const [internalDown, setInternalDown] = useState(5000)
  const [internalTerm, setInternalTerm] = useState(120)

  const monthlyPayment = controlledMonthly ?? internalMonthly
  const setMonthlyPayment = setControlledMonthly ?? setInternalMonthly
  const downPayment = controlledDown ?? internalDown
  const setDownPayment = setControlledDown ?? setInternalDown
  const loanTerm = controlledTerm ?? internalTerm
  const setLoanTerm = setControlledTerm ?? setInternalTerm

  const totalBudget = computeTotalBudget(monthlyPayment, downPayment, loanTerm)

  const formatCurrency = formatBudgetCurrency
  const showResultAndCta = !hideResultAndCta

  return (
    <div className="space-y-6 sm:space-y-7">
        {showResultAndCta && (
          <>
            <div className="rounded-xl border border-border bg-muted/30 px-4 py-5 text-center sm:px-6 sm:py-6">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground sm:text-sm">
                Up to
              </p>
              <p className="mt-1 text-4xl font-bold tabular-nums tracking-tight text-foreground sm:text-5xl">
                {formatCurrency(totalBudget)}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {INTEREST_RATE}% · {loanTerm} mo
              </p>
            </div>
          </>
        )}

        <div className="space-y-6 sm:space-y-7">
          {/* Monthly payment */}
          <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
              <Label className="text-sm font-medium text-foreground">
                Monthly
              </Label>
              <div className="flex items-center rounded-lg bg-muted/80 px-2 py-2 min-w-0 justify-end gap-1 sm:min-w-[7rem] sm:px-3">
                <span className="text-muted-foreground text-sm sm:text-base">$</span>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={formatWithCommas(monthlyPayment)}
                  onFocus={(e) => e.target.select()}
                  onKeyDownCapture={(e) => {
                    if (e.key === "Enter" || e.keyCode === 13) {
                      e.preventDefault()
                      e.stopPropagation()
                      ;(e.target as HTMLInputElement).blur()
                    }
                  }}
                  onChange={(e) =>
                    setMonthlyPayment(
                      Math.min(
                        MONTHLY_INPUT_MAX,
                        parsePaymentInput(e.target.value)
                      )
                    )
                  }
                  className="h-auto w-full max-w-[4rem] border-0 bg-transparent p-0 text-right text-sm font-semibold shadow-none focus-visible:ring-0 sm:max-w-[5.5rem] sm:text-base tabular-nums"
                  aria-label="Monthly payment in dollars"
                />
                <span className="text-xs text-muted-foreground sm:text-sm">
                  /mo
                </span>
              </div>
            </div>
            {/* Radix slider: desktop only; native range used on touch devices */}
            <div className="block [@media(pointer:coarse)]:hidden">
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
                step={1}
                className="cursor-pointer py-2 touch-manipulation"
              />
            </div>
            {/* Native range: touch devices only for reliable dragging */}
            <div className="hidden min-h-[2.75rem] items-center py-2 [@media(pointer:coarse)]:flex">
              <NativeBudgetRange
                value={monthlyPayment}
                min={MONTHLY_SLIDER_MIN}
                max={MONTHLY_SLIDER_MAX}
                setValue={(v) => setMonthlyPayment(Math.min(MONTHLY_INPUT_MAX, v))}
                ariaLabel="Monthly payment in dollars"
                inputMax={MONTHLY_INPUT_MAX}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(MONTHLY_SLIDER_MIN)}</span>
              <span>{formatCurrency(MONTHLY_SLIDER_MAX)}+</span>
            </div>
          </div>

          {/* Down payment */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label className="text-sm font-medium text-foreground">
                Down
              </Label>
              <div className="flex items-center rounded-lg bg-muted/80 px-2 py-2 min-w-0 justify-end gap-1 sm:min-w-[7rem] sm:px-3">
                <span className="text-muted-foreground text-sm sm:text-base">$</span>
                <Input
                  type="text"
                  inputMode="numeric"
                  value={formatWithCommas(downPayment)}
                  onFocus={(e) => e.target.select()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      ;(e.target as HTMLInputElement).blur()
                    }
                  }}
                  onChange={(e) =>
                    setDownPayment(
                      Math.min(
                        DOWN_INPUT_MAX,
                        parsePaymentInput(e.target.value)
                      )
                    )
                  }
                  className="h-auto w-full max-w-[5rem] border-0 bg-transparent p-0 text-right text-sm font-semibold shadow-none focus-visible:ring-0 sm:max-w-[6rem] sm:text-base tabular-nums"
                  aria-label="Down payment in dollars"
                />
              </div>
            </div>
            {/* Radix slider: desktop only */}
            <div className="block [@media(pointer:coarse)]:hidden">
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
                step={1}
                className="cursor-pointer py-2 touch-manipulation"
              />
            </div>
            {/* Native range: touch devices only */}
            <div className="hidden min-h-[2.75rem] items-center py-2 [@media(pointer:coarse)]:flex">
              <NativeBudgetRange
                value={downPayment}
                min={DOWN_SLIDER_MIN}
                max={DOWN_SLIDER_MAX}
                setValue={(v) => setDownPayment(Math.min(DOWN_INPUT_MAX, v))}
                ariaLabel="Down payment in dollars"
                inputMax={DOWN_INPUT_MAX}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatCurrency(DOWN_SLIDER_MIN)}</span>
              <span>{formatCurrency(DOWN_SLIDER_MAX)}+</span>
            </div>
          </div>

          {/* Loan term */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">
              Term
            </Label>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {LOAN_TERM_MONTHS.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLoanTerm(term)}
                  className={`
                    min-h-[2.75rem] rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-colors
                    touch-manipulation
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    ${
                      loanTerm === term
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-white text-muted-foreground hover:bg-muted"
                    }
                  `}
                >
                  {term} mo
                </button>
              ))}
            </div>
          </div>
        </div>

        {showResultAndCta && (
          <div className="pt-2">
            <Button className="w-full gap-2" size="lg" asChild>
              <Link href={`/?maxPrice=${totalBudget}`}>
                Shop RVs in my budget
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </Button>
          </div>
        )}
    </div>
  )
}
