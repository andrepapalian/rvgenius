"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type Step = {
  id: number
  name: string
  description: string
}

type OnboardingSidebarProps = {
  steps: Step[]
  currentStep: number
  onStepClick: (step: number) => void
}

export function OnboardingSidebar({ steps, currentStep, onStepClick }: OnboardingSidebarProps) {
  return (
    <aside className="hidden w-80 flex-shrink-0 border-r border-border bg-card lg:block">
      <div className="sticky top-16 p-8">
        <h2 className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          List Your RV
        </h2>
        <p className="mb-8 text-xs text-muted-foreground">
          Complete these steps to publish your listing
        </p>
        <nav className="space-y-1">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep
            const isCurrent = step.id === currentStep
            const isClickable = step.id <= currentStep

            return (
              <button
                key={step.id}
                onClick={() => onStepClick(step.id)}
                disabled={!isClickable}
                className={cn(
                  "group flex w-full items-start gap-4 rounded-lg p-3 text-left transition-colors",
                  isClickable && "cursor-pointer hover:bg-secondary",
                  !isClickable && "cursor-not-allowed opacity-50"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary text-primary",
                    !isCompleted && !isCurrent && "border-border text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="flex-1 pt-0.5">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
