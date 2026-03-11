"use client"

import { useState } from "react"
import { OnboardingHeader } from "@/components/onboarding/onboarding-header"
import { OnboardingSidebar } from "@/components/onboarding/onboarding-sidebar"
import { StepBasicInfo } from "@/components/onboarding/step-basic-info"
import { StepVehicleDetails } from "@/components/onboarding/step-vehicle-details"
import { StepPhotos } from "@/components/onboarding/step-photos"
import { StepPricing } from "@/components/onboarding/step-pricing"
import { StepReview } from "@/components/onboarding/step-review"

export type RVFormData = {
  // Basic Info
  title: string
  rvType: string
  make: string
  model: string
  year: string
  // Vehicle Details
  length: string
  sleeps: string
  slideouts: string
  fuelType: string
  mileage: string
  condition: string
  features: string[]
  description: string
  // Photos
  photos: File[]
  // Pricing
  price: string
  negotiable: boolean
  // Seller Info
  sellerName: string
  email: string
  phone: string
  location: string
}

const initialFormData: RVFormData = {
  title: "",
  rvType: "",
  make: "",
  model: "",
  year: "",
  length: "",
  sleeps: "",
  slideouts: "",
  fuelType: "",
  mileage: "",
  condition: "",
  features: [],
  description: "",
  photos: [],
  price: "",
  negotiable: false,
  sellerName: "",
  email: "",
  phone: "",
  location: "",
}

const steps = [
  { id: 1, name: "Basic Info", description: "RV type and identification" },
  { id: 2, name: "Vehicle Details", description: "Specifications and features" },
  { id: 3, name: "Photos", description: "Upload your RV images" },
  { id: 4, name: "Pricing", description: "Set your asking price" },
  { id: 5, name: "Review", description: "Confirm and publish" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<RVFormData>(initialFormData)

  const updateFormData = (data: Partial<RVFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step)
    }
  }

  const handleSubmit = () => {
    console.log("Submitting listing:", formData)
    // Handle form submission
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepBasicInfo
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        )
      case 2:
        return (
          <StepVehicleDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 3:
        return (
          <StepPhotos
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 4:
        return (
          <StepPricing
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        )
      case 5:
        return (
          <StepReview
            formData={formData}
            onBack={prevStep}
            onSubmit={handleSubmit}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <OnboardingHeader />
      <div className="flex">
        <OnboardingSidebar
          steps={steps}
          currentStep={currentStep}
          onStepClick={goToStep}
        />
        <main className="flex-1 px-6 py-8 lg:px-12 lg:py-10">
          <div className="mx-auto max-w-3xl">
            {renderStep()}
          </div>
        </main>
      </div>
    </div>
  )
}
