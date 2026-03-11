"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { RVFormData } from "@/app/page"
import {
  ArrowLeft,
  Check,
  Caravan,
  MapPin,
  Phone,
  Mail,
  Ruler,
  Users,
  Fuel,
  Gauge,
  Sparkles,
} from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

type StepReviewProps = {
  formData: RVFormData
  onBack: () => void
  onSubmit: () => void
}

const rvTypeLabels: Record<string, string> = {
  "class-a": "Class A Motorhome",
  "class-b": "Class B Camper Van",
  "class-c": "Class C Motorhome",
  "travel-trailer": "Travel Trailer",
  "fifth-wheel": "Fifth Wheel",
}

const conditionLabels: Record<string, string> = {
  new: "New",
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
  "needs-work": "Needs Work",
}

const fuelLabels: Record<string, string> = {
  gasoline: "Gasoline",
  diesel: "Diesel",
  electric: "Electric",
  hybrid: "Hybrid",
  na: "N/A",
}

const featureLabels: Record<string, string> = {
  "air-conditioning": "Air Conditioning",
  generator: "Generator",
  "solar-panels": "Solar Panels",
  awning: "Awning",
  "backup-camera": "Backup Camera",
  "leveling-system": "Leveling System",
  "washer-dryer": "Washer/Dryer",
  "outdoor-kitchen": "Outdoor Kitchen",
  fireplace: "Fireplace",
  "satellite-tv": "Satellite TV",
  "wifi-booster": "WiFi Booster",
  "king-bed": "King Bed",
}

export function StepReview({ formData, onBack, onSubmit }: StepReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    onSubmit()
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
          <Check className="h-10 w-10 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Listing Published!
        </h1>
        <p className="mt-3 max-w-md text-muted-foreground">
          Your RV has been successfully listed on RVMarket. {"You'll"} receive an email
          confirmation shortly, and we'll notify you when potential buyers reach out.
        </p>
        <div className="mt-8 flex gap-4">
          <Button variant="outline">View Listing</Button>
          <Button>List Another RV</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-1 text-sm font-medium text-primary">Step 5 of 5</div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Review & Publish</h1>
        <p className="mt-2 text-muted-foreground">
          Review your listing details before publishing to RVMarket.
        </p>
      </div>

      <div className="space-y-6">
        {/* Listing Preview Card */}
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-secondary px-6 py-4">
            <h3 className="font-semibold text-foreground">Listing Preview</h3>
          </div>
          <div className="p-6">
            <div className="flex flex-col gap-6 lg:flex-row">
              {/* Image placeholder */}
              <div className="aspect-[4/3] w-full flex-shrink-0 overflow-hidden rounded-lg bg-secondary lg:w-48">
                {formData.photos.length > 0 ? (
                  <div className="h-full w-full bg-muted flex items-center justify-center">
                    <Caravan className="h-12 w-12 text-muted-foreground" />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Caravan className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Badge variant="secondary">{rvTypeLabels[formData.rvType]}</Badge>
                  <Badge variant="outline">{conditionLabels[formData.condition]}</Badge>
                </div>
                <h4 className="text-xl font-semibold text-foreground">{formData.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formData.year} {formData.make} {formData.model}
                </p>
                <p className="mt-3 text-2xl font-bold text-primary">
                  ${Number(formData.price).toLocaleString()}
                  {formData.negotiable && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      (Negotiable)
                    </span>
                  )}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {formData.location}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-secondary px-6 py-4">
            <h3 className="font-semibold text-foreground">Specifications</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Ruler className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Length</p>
                <p className="font-medium text-foreground">{formData.length} ft</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sleeps</p>
                <p className="font-medium text-foreground">{formData.sleeps}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Fuel className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fuel</p>
                <p className="font-medium text-foreground">{fuelLabels[formData.fuelType]}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Gauge className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mileage</p>
                <p className="font-medium text-foreground">
                  {formData.mileage ? Number(formData.mileage).toLocaleString() : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        {formData.features.length > 0 && (
          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border bg-secondary px-6 py-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-foreground">Features</h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 p-6">
              {formData.features.map((feature) => (
                <Badge key={feature} variant="secondary">
                  {featureLabels[feature]}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-secondary px-6 py-4">
            <h3 className="font-semibold text-foreground">Description</h3>
          </div>
          <div className="p-6">
            <p className="whitespace-pre-wrap text-muted-foreground">{formData.description}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-secondary px-6 py-4">
            <h3 className="font-semibold text-foreground">Contact Information</h3>
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{formData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{formData.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between border-t border-border pt-6">
        <Button variant="outline" onClick={onBack} className="gap-2" disabled={isSubmitting}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2 min-w-[180px]">
          {isSubmitting ? (
            <>
              <Spinner className="h-4 w-4" />
              Publishing...
            </>
          ) : (
            <>
              <Check className="h-4 w-4" />
              Publish Listing
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
