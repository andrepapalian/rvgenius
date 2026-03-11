"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel, FieldSet, FieldLegend } from "@/components/ui/field"
import type { RVFormData } from "@/app/page"
import { ArrowLeft, ArrowRight } from "lucide-react"

type StepVehicleDetailsProps = {
  formData: RVFormData
  updateFormData: (data: Partial<RVFormData>) => void
  onNext: () => void
  onBack: () => void
}

const featureOptions = [
  { id: "air-conditioning", label: "Air Conditioning" },
  { id: "generator", label: "Generator" },
  { id: "solar-panels", label: "Solar Panels" },
  { id: "awning", label: "Awning" },
  { id: "backup-camera", label: "Backup Camera" },
  { id: "leveling-system", label: "Leveling System" },
  { id: "washer-dryer", label: "Washer/Dryer" },
  { id: "outdoor-kitchen", label: "Outdoor Kitchen" },
  { id: "fireplace", label: "Fireplace" },
  { id: "satellite-tv", label: "Satellite TV" },
  { id: "wifi-booster", label: "WiFi Booster" },
  { id: "king-bed", label: "King Bed" },
]

const conditions = [
  { value: "new", label: "New" },
  { value: "excellent", label: "Excellent" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "needs-work", label: "Needs Work" },
]

const fuelTypes = [
  { value: "gasoline", label: "Gasoline" },
  { value: "diesel", label: "Diesel" },
  { value: "electric", label: "Electric" },
  { value: "hybrid", label: "Hybrid" },
  { value: "na", label: "N/A (Towable)" },
]

export function StepVehicleDetails({
  formData,
  updateFormData,
  onNext,
  onBack,
}: StepVehicleDetailsProps) {
  const toggleFeature = (featureId: string) => {
    const newFeatures = formData.features.includes(featureId)
      ? formData.features.filter((f) => f !== featureId)
      : [...formData.features, featureId]
    updateFormData({ features: newFeatures })
  }

  const isValid = formData.length && formData.sleeps && formData.condition && formData.description

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-1 text-sm font-medium text-primary">Step 2 of 5</div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Vehicle Details</h1>
        <p className="mt-2 text-muted-foreground">
          Tell us more about your RV's specifications and features.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-3">
          <Field>
            <FieldLabel>Length (ft)</FieldLabel>
            <Input
              type="number"
              placeholder="e.g., 25"
              value={formData.length}
              onChange={(e) => updateFormData({ length: e.target.value })}
              className="bg-secondary border-border"
            />
          </Field>

          <Field>
            <FieldLabel>Sleeps</FieldLabel>
            <Select
              value={formData.sleeps}
              onValueChange={(value) => updateFormData({ sleeps: value })}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? "person" : "people"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Slideouts</FieldLabel>
            <Select
              value={formData.slideouts}
              onValueChange={(value) => updateFormData({ slideouts: value })}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          <Field>
            <FieldLabel>Fuel Type</FieldLabel>
            <Select
              value={formData.fuelType}
              onValueChange={(value) => updateFormData({ fuelType: value })}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {fuelTypes.map((fuel) => (
                  <SelectItem key={fuel.value} value={fuel.value}>
                    {fuel.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel>Mileage</FieldLabel>
            <Input
              type="number"
              placeholder="e.g., 45000"
              value={formData.mileage}
              onChange={(e) => updateFormData({ mileage: e.target.value })}
              className="bg-secondary border-border"
            />
          </Field>

          <Field>
            <FieldLabel>Condition</FieldLabel>
            <Select
              value={formData.condition}
              onValueChange={(value) => updateFormData({ condition: value })}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((condition) => (
                  <SelectItem key={condition.value} value={condition.value}>
                    {condition.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <FieldSet>
          <FieldLegend>Features & Amenities</FieldLegend>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {featureOptions.map((feature) => (
              <div key={feature.id} className="flex items-center gap-2">
                <Checkbox
                  id={feature.id}
                  checked={formData.features.includes(feature.id)}
                  onCheckedChange={() => toggleFeature(feature.id)}
                />
                <label
                  htmlFor={feature.id}
                  className="text-sm text-foreground cursor-pointer"
                >
                  {feature.label}
                </label>
              </div>
            ))}
          </div>
        </FieldSet>

        <FieldGroup>
          <Field>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              placeholder="Describe your RV in detail. Include any upgrades, maintenance history, and what makes it special..."
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              className="min-h-[150px] bg-secondary border-border"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              A detailed description helps buyers understand your RV better
            </p>
          </Field>
        </FieldGroup>
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
