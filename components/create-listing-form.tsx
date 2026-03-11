"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { rvTypes } from "@/lib/rv-data"
import { Check, ImagePlus, Loader2, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

const rvTypeOptions = rvTypes.map((t) => ({ value: t.value, label: t.label }))

export function CreateListingForm({ variant = "default" }: { variant?: "default" | "dashboard" }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [step, setStep] = useState(1)
  const [type, setType] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const payload =
      step === 2
        ? {
            type,
            year: formData.get("year") as string,
            make: formData.get("make") as string,
            model: formData.get("model") as string,
          }
        : null

    // When step 1 is submitted, you can call your specs API here
    // using the basic vehicle payload above, then move the user
    // to step 2 once specs are loaded.

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)

    if (step < 4) {
      setStep(step + 1)
      return
    }

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
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => {
              setIsSuccess(false)
              setStep(1)
            }}
          >
            List Another RV
          </Button>
          {variant === "dashboard" ? (
            <>
              <Button asChild>
                <Link href="/dashboard/listings">My Listings</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/">Browse Listings</Link>
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Progress Steps */}
      <div className="mb-8 flex items-center justify-between rounded-full bg-muted px-4 py-3">
        {[
          { num: 1, label: "Type" },
          { num: 2, label: "Basics" },
          { num: 3, label: "Details" },
          { num: 4, label: "Price" },
        ].map((s, i) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors md:h-9 md:w-9 md:text-sm ${
                  step >= s.num
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background text-muted-foreground"
                }`}
              >
                {step > s.num ? <Check className="h-5 w-5" /> : s.num}
              </div>
              <span className="mt-1 text-[0.7rem] font-medium uppercase tracking-wide text-[color:var(--muted-foreground)] md:text-xs">
                {s.label}
              </span>
            </div>
            {i < 3 && (
              <div className={`mx-2 h-px flex-1 rounded-full ${step > s.num ? "bg-primary" : "bg-border"}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Vehicle Info – questionnaire style */}
        {step === 1 && (
          <div className="space-y-6 md:min-h-[420px] md:flex md:flex-col md:justify-between">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground md:text-xs">
                  Question 1
                </p>
                <div>
                  <Label htmlFor="type">What type of RV are you listing?</Label>
                  <RadioGroup
                    className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
                    value={type}
                    onValueChange={setType}
                  >
                    {rvTypeOptions.map((opt) => {
                      const isActive = type === opt.value
                      return (
                        <label
                          key={opt.value}
                          className={`flex h-11 w-full cursor-pointer items-center justify-between rounded-lg border px-3 text-sm shadow-sm transition-colors md:h-auto md:flex-col md:justify-center md:px-2 md:py-2 md:aspect-square ${
                            isActive
                              ? "border-primary bg-primary/5"
                              : "border-border bg-card hover:border-primary/60 hover:bg-muted/40"
                          }`}
                        >
                          <RadioGroupItem value={opt.value} className="sr-only" />
                          <span className="px-2 text-center font-medium text-foreground">
                            {opt.label}
                          </span>
                        </label>
                      )
                    })}
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting specs…
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Year / Make / Model */}
        {step === 2 && (
          <div className="space-y-6 md:min-h-[420px] md:flex md:flex-col md:justify-between">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground md:text-xs">
                  Question 2
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="year">Model year?</Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      placeholder="2020"
                      min="1950"
                      max="2026"
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="make">What&apos;s the make?</Label>
                    <Input
                      id="make"
                      name="make"
                      placeholder="Winnebago"
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">What&apos;s the model?</Label>
                    <Input
                      id="model"
                      name="model"
                      placeholder="Vista 27P"
                      className="mt-1.5"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground md:text-xs">
                  Question 3
                </p>
                <p className="text-sm text-muted-foreground">
                  We&apos;ll use this info to pull the right specs and details for your listing.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="bg-transparent"
                size="lg"
                onClick={() => setStep(1)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1"
                size="lg"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Photos & Description */}
        {step === 3 && (
          <div className="space-y-6 md:min-h-[420px] md:flex md:flex-col md:justify-between">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground md:text-xs">
                  Question 4
                </p>
                <div>
                  <Label>Can you add a few photos?</Label>
                  <div className="mt-2 grid grid-cols-4 gap-3">
                    {[...Array(4)].map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-muted/40 transition-all hover:border-primary hover:bg-primary/5"
                      >
                        <ImagePlus className="h-6 w-6 text-muted-foreground" />
                        {i === 0 && (
                          <span className="text-[10px] font-medium text-muted-foreground">
                            Main
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Listings with great photos get significantly more views and messages.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground md:text-xs">
                  Question 5
                </p>
                <div>
                  <Label htmlFor="description">Anything a buyer should know upfront?</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Share condition, standout features, maintenance history, and what makes this RV a great find."
                    className="mt-1.5 min-h-32 resize-none"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent"
                  size="lg"
                  onClick={() => setStep(2)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                <Button
                  type="button"
                  className="flex-1"
                  size="lg"
                  onClick={() => setStep(4)}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Price & Contact */}
        {step === 4 && (
          <div className="space-y-6 md:min-h-[420px] md:flex md:flex-col md:justify-between">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground md:text-xs">
                  Question 6
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="price">What&apos;s your asking price?</Label>
                    <div className="relative mt-1.5">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg font-medium text-muted-foreground">
                        $
                      </span>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="45,000"
                        className="pl-8 text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Where is the RV located?</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="City, State (e.g., Denver, CO)"
                      className="mt-1.5"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground md:text-xs">
                  Question 7
                </p>
                <div className="rounded-xl bg-muted p-4">
                  <p className="mb-3 text-sm font-medium text-foreground">
                    How should buyers reach you?
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
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
                        name="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="mt-1.5 bg-card"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent"
                  size="lg"
                  onClick={() => setStep(3)}
                >
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

              <p className="mt-3 text-center text-xs text-muted-foreground">
                By posting, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
