"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function ProfileForm() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>This is the information buyers will use to contact you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Your name" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="(555) 123-4567" />
            </div>
          </div>
          <Button>Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-200">
            When a buyer clicks &quot;Contact Seller&quot; on your listing, Public shows your email and phone right away. Email Only or Phone Only shows just that field. Private sends the request to your Requests tab so you choose who to share with.
          </div>
          <RadioGroup defaultValue="private" className="flex flex-col gap-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-[#F9F9F9] [&:has([data-state=checked])]:bg-[#F9F9F9]">
              <RadioGroupItem value="public" id="privacy-public" className="shrink-0" />
              <div>
                <p className="font-medium">Public</p>
                <p className="text-xs text-muted-foreground">
                  Buyers see your email and phone as soon as they click Contact Seller.
                </p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-[#F9F9F9] [&:has([data-state=checked])]:bg-[#F9F9F9]">
              <RadioGroupItem value="email-only" id="privacy-email" className="shrink-0" />
              <div>
                <p className="font-medium">Email Only</p>
                <p className="text-xs text-muted-foreground">
                  Buyers see only your email when they click Contact Seller.
                </p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-[#F9F9F9] [&:has([data-state=checked])]:bg-[#F9F9F9]">
              <RadioGroupItem value="phone-only" id="privacy-phone" className="shrink-0" />
              <div>
                <p className="font-medium">Phone Only</p>
                <p className="text-xs text-muted-foreground">
                  Buyers see only your phone number when they click Contact Seller.
                </p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 hover:bg-[#F9F9F9] [&:has([data-state=checked])]:bg-[#F9F9F9]">
              <RadioGroupItem value="private" id="privacy-private" className="shrink-0" />
              <div>
                <p className="font-medium">Private</p>
                <p className="text-xs text-muted-foreground">
                  Requests go to your Requests tab; you choose who to share your contact info with.
                </p>
              </div>
            </label>
          </RadioGroup>
          <Button>Save preferences</Button>
        </CardContent>
      </Card>
    </div>
  )
}
