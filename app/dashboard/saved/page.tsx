import { SavedRVGrid } from "@/components/saved-rv-grid"

export default function DashboardSavedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Saved RVs</h1>
        <p className="mt-1 text-muted-foreground">
          Listings you&apos;ve saved. Click to view or unfavorite.
        </p>
      </div>
      <SavedRVGrid />
    </div>
  )
}
