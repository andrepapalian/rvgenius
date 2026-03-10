import { ShieldCheck, Eye, Tag } from "lucide-react"

export function HomeTrustBanner() {
  return (
    <section className="border-y border-primary/30 bg-[#1F2D5C]">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="grid grid-cols-3 gap-3 text-[0.7rem] text-primary-foreground/80 sm:text-xs lg:text-sm">
          <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-start sm:text-left sm:gap-3">
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-white sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary-foreground sm:text-[0.7rem] lg:text-xs">
                RV marketplace
              </span>
              <span className="hidden text-xs text-primary-foreground/80 sm:block">
                Built specifically for RV buyers and sellers.
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-start sm:text-left sm:gap-3">
            <Eye className="mt-0.5 h-6 w-6 shrink-0 text-white sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary-foreground sm:text-[0.7rem] lg:text-xs">
                No account needed
              </span>
              <span className="hidden text-xs text-primary-foreground/80 sm:block">
                Browse current listings without creating an account.
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-start sm:text-left sm:gap-3">
            <Tag className="mt-0.5 h-6 w-6 shrink-0 text-white sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary-foreground sm:text-[0.7rem] lg:text-xs">
                Free RV listings
              </span>
              <span className="hidden text-xs text-primary-foreground/80 sm:block">
                Create and publish your RV listing with no listing fees.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

