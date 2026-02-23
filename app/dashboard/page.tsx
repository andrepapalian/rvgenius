import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CreateListingForm } from "@/components/create-listing-form"
import { Check } from "lucide-react"

export const metadata = {
  title: "Sell Your RV | RVMarket",
  description: "List your RV for sale in minutes - free!",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-card py-10">
          <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h1 className="text-3xl font-bold text-foreground">
              Sell your RV for the best price
            </h1>
            <p className="mt-2 text-muted-foreground">
              List for free and reach thousands of buyers
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" />
                Free to list
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" />
                Direct buyer contact
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" />
                Cancel anytime
              </span>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
          <div className="rounded-xl bg-card p-6 shadow-sm sm:p-8">
            <CreateListingForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
