import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ProfileForm } from "@/components/profile-form"

export default function DashboardProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="mt-1 text-muted-foreground">
          Your name, contact info, and how your info is shared when buyers click Contact Seller.
        </p>
      </div>

      <ProfileForm />
    </div>
  )
}
