import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateListingForm } from "@/components/create-listing-form"

export default function DashboardCreatePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Create Listing</h1>
        <p className="mt-1 text-muted-foreground">
          List your RV for sale. Free to list, and you stay in control.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-border">
          <CardTitle>New listing</CardTitle>
          <CardDescription>
            Vehicle info → Photos & description → Price & contact
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <CreateListingForm variant="dashboard" />
        </CardContent>
      </Card>
    </div>
  )
}
