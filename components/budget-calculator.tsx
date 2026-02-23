"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calculator, DollarSign, ArrowRight } from "lucide-react"
import Link from "next/link"

export function BudgetCalculator() {
  const [monthlyPayment, setMonthlyPayment] = useState(500)
  const [downPayment, setDownPayment] = useState(5000)
  const [loanTerm, setLoanTerm] = useState(84) // months
  const [interestRate] = useState(7.5) // average RV loan rate
  const [totalBudget, setTotalBudget] = useState(0)

  useEffect(() => {
    // Calculate total budget based on monthly payment
    // Using standard loan formula: PV = PMT * [(1 - (1 + r)^-n) / r]
    const monthlyRate = interestRate / 100 / 12
    const loanAmount = monthlyPayment * ((1 - Math.pow(1 + monthlyRate, -loanTerm)) / monthlyRate)
    const total = loanAmount + downPayment
    setTotalBudget(Math.round(total))
  }, [monthlyPayment, downPayment, loanTerm, interestRate])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Calculator className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground">What can I afford?</h3>
          <p className="text-sm text-muted-foreground">Estimate your RV budget</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Monthly Payment Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Monthly payment</Label>
            <div className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1.5">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value) || 0)}
                className="h-auto w-20 border-0 bg-transparent p-0 text-right font-semibold focus-visible:ring-0"
              />
              <span className="text-sm text-muted-foreground">/mo</span>
            </div>
          </div>
          <Slider
            value={[monthlyPayment]}
            onValueChange={(v) => setMonthlyPayment(v[0])}
            min={200}
            max={3000}
            step={50}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$200</span>
            <span>$3,000</span>
          </div>
        </div>

        {/* Down Payment Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Down payment</Label>
            <div className="flex items-center gap-1 rounded-lg bg-muted px-3 py-1.5">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                className="h-auto w-20 border-0 bg-transparent p-0 text-right font-semibold focus-visible:ring-0"
              />
            </div>
          </div>
          <Slider
            value={[downPayment]}
            onValueChange={(v) => setDownPayment(v[0])}
            min={0}
            max={50000}
            step={1000}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0</span>
            <span>$50,000</span>
          </div>
        </div>

        {/* Loan Term */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Loan term</Label>
            <span className="text-sm font-semibold text-foreground">{loanTerm / 12} years</span>
          </div>
          <div className="flex gap-2">
            {[60, 84, 120, 180].map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setLoanTerm(term)}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  loanTerm === term
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {term / 12}yr
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="rounded-xl bg-primary/5 p-4">
          <p className="text-sm text-muted-foreground">Your estimated budget</p>
          <p className="text-3xl font-bold text-primary">{formatCurrency(totalBudget)}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Based on {interestRate}% APR for {loanTerm / 12} years
          </p>
        </div>

        <Button className="w-full gap-2" size="lg" asChild>
          <Link href={`/?maxPrice=${totalBudget}`}>
            Shop RVs in my budget
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
