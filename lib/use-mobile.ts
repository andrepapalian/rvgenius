"use client"

import { useEffect, useState } from "react"

/**
 * Matches Tailwind's lg breakpoint (1024px). When true, use native <select> for system picker.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023px)")
    const handler = () => setIsMobile(mql.matches)
    handler() // set initial
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  return isMobile
}
