"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { rvTypes } from "@/lib/rv-data"
import { Check, Loader2, ImagePlus, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function CreateListingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#00a651]">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h3 className="mt-6 text-2xl font-bold text-foreground">
          Your listing is live!
        </h3>
        <p className="mx-auto mt-2 max-w-sm text-muted-foreground">
          Buyers can now see your RV. We&apos;ll notify you when someone reaches out.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button variant="outline" className="bg-transparent" onClick={() => { setIsSuccess(false); setStep(1) }}>
            List Another RV
          </Button>
          <Button asChild>
            <Link href="/">Browse Listings</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-between">
        {[
          { num: 1, label: "Vehicle" },
          { num: 2, label: "Details" },
          { num: 3, label: "Price" },
        ].map((s, i) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  step >= s.num
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s.num ? <Check className="h-5 w-5" /> : s.num}
              </div>
              <span className={`mt-2 text-xs ${step >= s.num ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {s.label}
              </span>
            </div>
            {i < 2 && (
              <div className={`h-0.5 flex-1 mx-2 ${step > s.num ? "bg-primary" : "bg-muted"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Vehicle Info */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-foreground">What are you selling?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Basic info about your RV</p>
            </div>
            
            <div>
              <Label htmlFor="type">RV Type</Label>
              <Select required>
                <SelectTrigger id="type" className="mt-1.5">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {rvTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  placeholder="2020"
                  min="1950"
                  max="2026"
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  placeholder="Winnebago"
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  placeholder="Vista 27P"
                  className="mt-1.5"
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  id="mileage"
                  type="number"
                  placeholder="25,000"
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="length">Length (ft)</Label>
                <Input
                  id="length"
                  type="number"
                  placeholder="28"
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="sleeps">Sleeps</Label>
                <Input
                  id="sleeps"
                  type="number"
                  placeholder="4"
                  className="mt-1.5"
                  required
                />
              </div>
            </div>

            <Button type="button" className="w-full" size="lg" onClick={() => setStep(2)}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Photos & Description */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Add photos & details</h2>
              <p className="mt-1 text-sm text-muted-foreground">Help buyers learn about your RV</p>
            </div>

            <div>
              <Label>Photos</Label>
              <div className="mt-2 grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-muted/30 transition-all hover:border-primary hover:bg-primary/5"
                  >
                    <ImagePlus className="h-6 w-6 text-muted-foreground" />
                    {i === 0 && <span className="text-[10px] text-muted-foreground">Main</span>}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Listings with photos get 10x more views
              </p>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell buyers about your RV - condition, notable features, recent maintenance, why you're selling..."
                className="mt-1.5 min-h-32 resize-none"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="bg-transparent" size="lg" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="button" className="flex-1" size="lg" onClick={() => setStep(3)}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Price & Contact */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Set your price</h2>
              <p className="mt-1 text-sm text-muted-foreground">Almost done!</p>
            </div>

            <div>
              <Label htmlFor="price">Asking Price</Label>
              <div className="relative mt-1.5">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg font-medium text-muted-foreground">$</span>
                <Input
                  id="price"
                  type="number"
                  placeholder="45,000"
                  className="pl-8 text-lg"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, State (e.g., Denver, CO)"
                className="mt-1.5"
                required
              />
            </div>

            <div className="rounded-xl bg-muted/50 p-4">
              <p className="mb-3 text-sm font-medium text-foreground">Contact Information</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@email.com"
                    className="mt-1.5 bg-card"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="mt-1.5 bg-card"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" className="bg-transparent" size="lg" onClick={() => setStep(2)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button type="submit" className="flex-1" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post My Listing"
                )}
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground">
              By posting, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
