"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Send, Inbox } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"

type RequestView = "sent" | "received"

type SentRequest = {
  id: string
  listingId: string
  listingTitle: string
  dateLabel: string
  status: "Sent" | "Seen"
  sellerName: string
}

type ReceivedRequest = {
  id: string
  listingTitle: string
  dateLabel: string
  status: "Unread" | "Read"
  buyerName: string
  buyerEmail: string
  buyerPhone?: string
  message: string
}

export default function DashboardMessagesPage() {
  const searchParams = useSearchParams()
  const initialViewParam = searchParams.get("view")
  const [view, setView] = useState<RequestView>(
    initialViewParam === "sent" || initialViewParam === "received"
      ? initialViewParam
      : "received"
  )
  const sentRequests = useMemo<SentRequest[]>(
    () => [
      {
        id: "sent_1",
        listingId: "1",
        listingTitle: "2020 Winnebago Vista 27P",
        dateLabel: "Mar 5, 2025",
        status: "Sent",
        sellerName: "Alex Rivera",
      },
      {
        id: "sent_2",
        listingId: "2",
        listingTitle: "2022 Airstream Caravel 22FB",
        dateLabel: "Mar 2, 2025",
        status: "Seen",
        sellerName: "Casey Nguyen",
      },
    ],
    []
  )
  const receivedRequests = useMemo<ReceivedRequest[]>(
    () => [
      {
        id: "req_1",
        listingTitle: "2021 Airstream Flying Cloud",
        dateLabel: "Mar 6, 2025",
        status: "Unread",
        buyerName: "Taylor Morgan",
        buyerEmail: "taylor.morgan@example.com",
        buyerPhone: "(555) 013-2847",
        message:
          "Hi! Is this still available? I’d love to see recent maintenance records and confirm the weight/length. I’m flexible on pickup this weekend.",
      },
      {
        id: "req_2",
        listingTitle: "2019 Thor Four Winds",
        dateLabel: "Mar 4, 2025",
        status: "Read",
        buyerName: "Jordan Lee",
        buyerEmail: "jordan.lee@example.com",
        message:
          "Hello — can you share more photos of the interior and the tire condition? Also, any known issues with the generator or slide-out?",
      },
    ],
    []
  )
  const unreadCount = useMemo(
    () => receivedRequests.filter((r) => r.status === "Unread").length,
    [receivedRequests]
  )

  const [openRequest, setOpenRequest] = useState<ReceivedRequest | null>(null)

  useEffect(() => {
    if (!openRequest) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenRequest(null)
    }

    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [openRequest])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Requests</h1>
        <p className="mt-1 text-muted-foreground">
          Contact requests you&apos;ve sent and received. Manage who can reach you.
        </p>
      </div>

      {/* Sent / Received toggle */}
      <div className="inline-flex rounded-lg border border-border bg-muted/30 p-1">
        <button
          type="button"
          onClick={() => setView("sent")}
          className={cn(
            "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            view === "sent"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Send className="size-4" />
          Sent
        </button>
        <button
          type="button"
          onClick={() => setView("received")}
          className={cn(
            "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            view === "received"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="relative inline-flex">
            <Inbox className="size-4" />
            {unreadCount > 0 && (
              <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </span>
          <span>Received</span>
        </button>
      </div>

      <div className="max-w-2xl">
        {/* Sent */}
        {view === "sent" && (
            <ul className="space-y-2">
              {sentRequests.map((req) => (
                <li key={req.id}>
                  <Link
                    href={`/listing/${req.listingId}`}
                    onClick={() => {
                      try {
                        window.sessionStorage.setItem(
                          "rvg:backTarget",
                          JSON.stringify({
                            href: `/dashboard/messages?view=${view}`,
                            label: "Back to requests",
                          })
                        )
                      } catch {
                        // ignore
                      }
                    }}
                    className={cn(
                      "relative block rounded-lg border border-border bg-background p-3 pb-10 text-left transition-colors md:pb-3",
                      "hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-background"
                    )}
                    aria-label={`Open sent request to ${req.sellerName}`}
                  >
                    <div className="min-w-0 md:flex md:items-center md:justify-between md:gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">
                          {req.listingTitle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Request to {req.sellerName}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{req.dateLabel}</p>
                      </div>

                      <Badge
                        variant="secondary"
                        className={cn(
                          "absolute bottom-3 left-3 md:static",
                          req.status === "Sent"
                            ? "border-transparent bg-foreground text-background"
                            : undefined
                        )}
                      >
                        {req.status}
                      </Badge>
                    </div>
                  </Link>
                </li>
              ))}
              {sentRequests.length === 0 && (
                <li className="rounded-lg border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground">
                  No sent requests yet. When you click &quot;Contact Seller&quot; on a listing, it will appear here.
                </li>
              )}
            </ul>
        )}

        {/* Received */}
        {view === "received" && (
            <ul className="space-y-2">
              {receivedRequests.map((req) => (
                <li key={req.id}>
                  <button
                    type="button"
                    onClick={() => setOpenRequest(req)}
                    className={cn(
                      "relative w-full rounded-lg border border-border bg-background p-3 pb-10 text-left transition-colors md:pb-3",
                      "hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-background"
                    )}
                    aria-label={`Open request from ${req.buyerName}`}
                  >
                    <div className="min-w-0 md:flex md:items-center md:justify-between md:gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground">
                          Request from {req.buyerName}
                        </p>
                        <p className="text-xs text-muted-foreground">About {req.listingTitle}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{req.dateLabel}</p>
                      </div>

                      <Badge
                        variant="secondary"
                        className={cn(
                          "absolute bottom-3 left-3 md:static",
                          req.status === "Unread"
                            ? "border-transparent bg-foreground text-background"
                            : undefined
                        )}
                      >
                        {req.status}
                      </Badge>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
        )}
      </div>

      {/* Modal (Received request details) */}
      {openRequest && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Request details"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenRequest(null)}
            aria-label="Close modal"
          />

          <div className="relative mx-auto mt-24 w-[calc(100%-2rem)] max-w-lg rounded-xl border border-border bg-background shadow-lg">
            <div className="space-y-1 border-b border-border p-4">
              <p className="text-sm font-medium text-foreground">
                Request from {openRequest.buyerName}
              </p>
              <p className="text-xs text-muted-foreground">
                About {openRequest.listingTitle} • {openRequest.dateLabel}
              </p>
            </div>

            <div className="space-y-4 p-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Buyer</p>
                <p className="text-sm text-foreground">{openRequest.buyerName}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Email</p>
                  <p className="text-sm text-foreground">{openRequest.buyerEmail}</p>
                </div>
                {openRequest.buyerPhone && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Phone</p>
                    <p className="text-sm text-foreground">{openRequest.buyerPhone}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs font-medium text-muted-foreground">Message</p>
                <p className="whitespace-pre-wrap text-sm text-foreground">
                  {openRequest.message}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-border p-4">
              <Button variant="outline" onClick={() => setOpenRequest(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
