"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useIsMobile } from "@/lib/use-mobile"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import type { ReactNode } from "react"

export interface ResponsiveSelectOption {
  value: string
  label: string
}

interface ResponsiveSelectProps {
  value: string
  onValueChange: (value: string) => void
  options: ResponsiveSelectOption[]
  placeholder?: string
  /** Applied to the Radix trigger on desktop */
  triggerClassName?: string
  /** Applied to the native <select> on mobile */
  selectClassName?: string
  /** Custom icon shown in the trigger (replaces default chevron) */
  triggerIcon?: ReactNode
  ariaLabel?: string
  required?: boolean
  name?: string
  id?: string
}

/**
 * Renders a native <select> on mobile (system picker) and Radix Select on desktop.
 */
export function ResponsiveSelect({
  value,
  onValueChange,
  options,
  placeholder,
  triggerClassName,
  selectClassName,
  triggerIcon,
  ariaLabel,
  required,
  name,
  id,
}: ResponsiveSelectProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <div className={cn("relative flex items-center", selectClassName)}>
        <select
          id={id}
          name={name}
          value={value}
          onChange={(e) => {
            onValueChange(e.target.value)
            ;(e.target as HTMLSelectElement).blur()
          }}
          required={required}
          aria-label={ariaLabel}
          className={cn(
            "h-full w-full min-w-0 appearance-none rounded-md border border-border bg-muted pl-3 pr-8 py-0 text-sm leading-none text-foreground focus:outline-none focus:ring-2 focus:ring-ring [&::-ms-expand]:hidden",
            selectClassName
          )}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center text-muted-foreground" aria-hidden>
          {triggerIcon ?? <ChevronDown className="h-4 w-4 shrink-0" />}
        </span>
      </div>
    )
  }

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      onOpenChange={(open) => {
        if (!open) (document.activeElement as HTMLElement)?.blur()
      }}
    >
      <SelectTrigger id={id} className={triggerClassName} icon={triggerIcon} aria-required={required}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
