"use client"

import * as React from "react"
import { Root as RadioGroupRoot, Item as RadioGroupItemPrimitive, Indicator as RadioGroupIndicator } from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupRoot>,
  React.ComponentPropsWithoutRef<typeof RadioGroupRoot>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupRoot
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupItemPrimitive>,
  React.ComponentPropsWithoutRef<typeof RadioGroupItemPrimitive>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupItemPrimitive
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-foreground text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupIndicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-foreground" />
      </RadioGroupIndicator>
    </RadioGroupItemPrimitive>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
