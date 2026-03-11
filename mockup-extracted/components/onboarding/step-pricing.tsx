"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import type { RVFormData } from "@/app/page"
import { ArrowLeft, ArrowRight, DollarSign, TrendingUp, AlertCircle } from "lucide-react"

type StepPricingProps = {
  formData: RVFormData
  updateFormData: (data: Partial<RVFormData>) => void
  onNext: () => void
  onBack: () => void
}

export function StepPricing({ formData, updateFormData, onNext, onBack }: StepPricingProps) {
  const formatPrice = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    if (numericValue) {
      return Number(numericValue).toLocaleString()
    }
    return ""
  }

  const handlePriceChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "")
    updateFormData({ price: numericValue })
  }

  const isValid = formData.price && formData.sellerName && formData.email && formData.phone && formData.location

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-1 text-sm font-medium text-primary">Step 4 of 5</div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Pricing & Contact</h1>
        <p className="mt-2 text-muted-foreground">
          Set your asking price and provide your contact information.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Set Your Price</h3>
              <p className="text-sm text-muted-foreground">
                Research similar RVs to price competitively
              </p>
            </div>
          </div>

          <FieldGroup>
            <Field>
              <FieldLabel>Asking Price (USD)</FieldLabel>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="text"
                  placeholder="0"
                  value={formatPrice(formData.price)}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="bg-secondary border-border pl-7 text-2xl font-semibold h-14"
                />
              </div>
            </Field>
          </FieldGroup>

          <div className="mt-4 flex items-center justify-between rounded-lg bg-secondary p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Price Negotiable</p>
                <p className="text-xs text-muted-foreground">
                  Let buyers know you're open to offers
                </p>
              </div>
            </div>
            <Switch
              checked={formData.negotiable}
              onCheckedChange={(checked) => updateFormData({ negotiable: checked })}
            />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 font-semibold text-foreground">Seller Information</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Your Name</FieldLabel>
                <Input
                  placeholder="John Smith"
                  value={formData.sellerName}
                  onChange={(e) => updateFormData({ sellerName: e.target.value })}
                  className="bg-secondary border-border"
                />
              </Field>

              <Field>
                <FieldLabel>Email Address</FieldLabel>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  className="bg-secondary border-border"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel>Phone Number</FieldLabel>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  className="bg-secondary border-border"
                />
              </Field>

              <Field>
                <FieldLabel>Location</FieldLabel>
                <Input
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => updateFormData({ location: e.target.value })}
                  className="bg-secondary border-border"
                />
              </Field>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-primary" />
          <div className="text-sm">
            <p className="font-medium text-foreground">Privacy Notice</p>
            <p className="mt-1 text-muted-foreground">
              Your contact information will only be shared with potential buyers who express
              interest in your listing.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between border-t border-border pt-6">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid} className="gap-2">
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
