"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

const STORAGE_KEY = "rvg:backTarget"

type BackTarget = {
  href: string
  label: string
}

function safeParseBackTarget(raw: string | null): BackTarget | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as unknown
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "href" in parsed &&
      "label" in parsed &&
      typeof (parsed as any).href === "string" &&
      typeof (parsed as any).label === "string"
    ) {
      return { href: (parsed as any).href, label: (parsed as any).label }
    }
  } catch {
    // ignore
  }
  return null
}

export function ListingBackLink() {
  const router = useRouter()
  const [target, setTarget] = useState<BackTarget | null>(null)

  useEffect(() => {
    setTarget(safeParseBackTarget(window.sessionStorage.getItem(STORAGE_KEY)))
  }, [])

  const fallback = useMemo<BackTarget>(
    () => ({ href: "/?all=1", label: "Back to search results" }),
    []
  )

  const effective = target ?? fallback

  if (target) {
    return (
      <button
        type="button"
        onClick={() => {
          window.sessionStorage.removeItem(STORAGE_KEY)
          router.push(effective.href)
        }}
        className="inline-flex items-center text-sm text-primary hover:underline"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        {effective.label}
      </button>
    )
  }

  return (
    <Link href={effective.href} className="inline-flex items-center text-sm text-primary hover:underline">
      <ArrowLeft className="mr-1 h-4 w-4" />
      {effective.label}
    </Link>
  )
}

