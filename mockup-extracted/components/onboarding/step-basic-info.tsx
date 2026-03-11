"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import type { RVFormData } from "@/app/page"
import { ArrowRight, Caravan, Truck, Home, Bus } from "lucide-react"
import { cn } from "@/lib/utils"

type StepBasicInfoProps = {
  formData: RVFormData
  updateFormData: (data: Partial<RVFormData>) => void
  onNext: () => void
}

const rvTypes = [
  { id: "class-a", name: "Class A", icon: Bus, description: "Largest motorhomes" },
  { id: "class-b", name: "Class B", icon: Truck, description: "Camper vans" },
  { id: "class-c", name: "Class C", icon: Caravan, description: "Cab-over design" },
  { id: "travel-trailer", name: "Travel Trailer", icon: Caravan, description: "Towable trailers" },
  { id: "fifth-wheel", name: "Fifth Wheel", icon: Home, description: "Hitch-in-bed trailers" },
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 40 }, (_, i) => (currentYear - i).toString())

export function StepBasicInfo({ formData, updateFormData, onNext }: StepBasicInfoProps) {
  const isValid = formData.rvType && formData.make && formData.model && formData.year && formData.title

  return (
    <div className="space-y-8">
      <div>
        <div className="mb-1 text-sm font-medium text-primary">Step 1 of 5</div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Basic Information</h1>
        <p className="mt-2 text-muted-foreground">
          {"Let's start with the basics about your RV. This information helps buyers find your listing."}
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="mb-3 block text-sm font-medium text-foreground">
            Select RV Type
          </Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {rvTypes.map((type) => {
              const Icon = type.icon
              const isSelected = formData.rvType === type.id
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => updateFormData({ rvType: type.id })}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all",
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-8 w-8",
                      isSelected ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  <span
                    className={cn(
                      "text-sm font-medium",
                      isSelected ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {type.name}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <FieldGroup>
          <Field>
            <FieldLabel>Listing Title</FieldLabel>
            <Input
              placeholder="e.g., 2020 Winnebago View 24D - Like New"
              value={formData.title}
              onChange={(e) => updateFormData({ title: e.target.value })}
              className="bg-secondary border-border"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              A catchy title helps your listing stand out
            </p>
          </Field>
        </FieldGroup>

        <div className="grid gap-6 sm:grid-cols-3">
          <Field>
            <FieldLabel>Make</FieldLabel>
            <Input
              placeholder="e.g., Winnebago"
              value={formData.make}
              onChange={(e) => updateFormData({ make: e.target.value })}
              className="bg-secondary border-border"
            />
          </Field>

          <Field>
            <FieldLabel>Model</FieldLabel>
            <Input
              placeholder="e.g., View 24D"
              value={formData.model}
              onChange={(e) => updateFormData({ model: e.target.value })}
              className="bg-secondary border-border"
            />
          </Field>

          <Field>
            <FieldLabel>Year</FieldLabel>
            <Select
              value={formData.year}
              onValueChange={(value) => updateFormData({ year: value })}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </div>

      <div className="flex justify-end border-t border-border pt-6">
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="gap-2"
        >
          Continue
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
