import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Send, Inbox, Eye, Mail } from "lucide-react"

export default function DashboardMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Requests</h1>
        <p className="mt-1 text-muted-foreground">
          Contact requests you&apos;ve sent and received. Manage who can reach you.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Sent */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Send className="size-4" />
              Sent
            </CardTitle>
            <CardDescription>
              Contact requests you sent (e.g. after clicking Contact Seller). Status: Sent or Seen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {/* Example sent request */}
              <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3">
                <div>
                  <Link
                    href="/listing/1"
                    className="font-medium text-foreground hover:underline"
                  >
                    2020 Winnebago Vista 27P
                  </Link>
                  <p className="text-xs text-muted-foreground">Sent Mar 5, 2025</p>
                </div>
                <Badge variant="secondary">Sent</Badge>
              </li>
              <li className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No other sent requests. When you click &quot;Contact Seller&quot; on a listing, it will appear here.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Received */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Inbox className="size-4" />
              Received
            </CardTitle>
            <CardDescription>
              Contact requests you received as a seller. Read or unread; view contact info and choose whether to respond.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {/* Example received: unread */}
              <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-muted/30 p-3">
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Request about 2021 Airstream Flying Cloud</p>
                    <p className="text-xs text-muted-foreground">Mar 6, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">Unread</Badge>
                  <Button size="sm" variant="outline">
                    View contact info
                  </Button>
                </div>
              </li>
              {/* Example received: read */}
              <li className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3">
                <div className="flex items-center gap-2">
                  <Eye className="size-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Request about 2019 Thor Four Winds</p>
                    <p className="text-xs text-muted-foreground">Mar 4, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Read</Badge>
                  <Button size="sm" variant="ghost">
                    View again
                  </Button>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
