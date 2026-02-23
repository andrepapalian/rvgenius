import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getRVById, rvListings } from "@/lib/rv-data"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Heart,
  Share2,
  Check,
  ShieldCheck,
} from "lucide-react"

interface ListingPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  return rvListings.map((rv) => ({
    id: rv.id,
  }))
}

export async function generateMetadata({ params }: ListingPageProps) {
  const { id } = await params
  const listing = getRVById(id)
  
  if (!listing) {
    return { title: "Listing Not Found | RVMarket" }
  }

  return {
    title: `${listing.year} ${listing.make} ${listing.model} | RVMarket`,
    description: listing.description,
  }
}

function getDealInfo(deal: string) {
  switch (deal) {
    case "great":
      return { label: "Great Deal", color: "bg-[#00a651]", textColor: "text-[#00a651]" }
    case "good":
      return { label: "Good Deal", color: "bg-[#7cb342]", textColor: "text-[#7cb342]" }
    case "fair":
      return { label: "Fair Deal", color: "bg-[#fdd835]", textColor: "text-[#c6a700]" }
    default:
      return { label: "Good Deal", color: "bg-[#7cb342]", textColor: "text-[#7cb342]" }
  }
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params
  const listing = getRVById(id)

  if (!listing) {
    notFound()
  }

  const dealInfo = getDealInfo(listing.deal)

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-card">
          <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to search results
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Image Gallery */}
              <div className="relative overflow-hidden rounded-xl bg-card">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={listing.images[0] || "/placeholder.svg"}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className={`absolute left-4 top-4 rounded px-3 py-1 text-sm font-bold text-white ${dealInfo.color}`}>
                    {dealInfo.label}
                  </div>
                  <div className="absolute right-4 top-4 flex gap-2">
                    <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-card/90 shadow-sm transition-colors hover:bg-card">
                      <Heart className="h-5 w-5 text-muted-foreground" />
                    </button>
                    <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-card/90 shadow-sm transition-colors hover:bg-card">
                      <Share2 className="h-5 w-5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Title Section - Mobile */}
              <div className="rounded-xl bg-card p-5 lg:hidden">
                <p className="text-sm text-muted-foreground">{listing.typeName}</p>
                <h1 className="mt-1 text-2xl font-bold text-foreground">
                  {listing.year} {listing.make} {listing.model}
                </h1>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">
                    ${listing.price.toLocaleString()}
                  </span>
                  <span className={`text-sm font-semibold ${dealInfo.textColor}`}>
                    {dealInfo.label}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-1 h-4 w-4" />
                  {listing.location}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="rounded-xl bg-card p-5">
                <h2 className="text-lg font-semibold text-foreground">Vehicle Overview</h2>
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">{listing.year}</p>
                    <p className="text-xs text-muted-foreground">Year</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">
                      {listing.mileage > 0 ? `${Math.round(listing.mileage / 1000)}k` : "New"}
                    </p>
                    <p className="text-xs text-muted-foreground">Miles</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">{listing.length}</p>
                    <p className="text-xs text-muted-foreground">Feet</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">{listing.sleeps}</p>
                    <p className="text-xs text-muted-foreground">Sleeps</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="rounded-xl bg-card p-5">
                <h2 className="text-lg font-semibold text-foreground">Seller&apos;s Description</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {listing.description}
                </p>
              </div>

              {/* Features */}
              <div className="rounded-xl bg-card p-5">
                <h2 className="text-lg font-semibold text-foreground">Features</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {listing.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="rounded-xl bg-card p-5">
                <h2 className="text-lg font-semibold text-foreground">Specifications</h2>
                <div className="mt-4 grid gap-0 divide-y divide-border">
                  {[
                    ["Make", listing.make],
                    ["Model", listing.model],
                    ["Year", listing.year],
                    ["Type", listing.typeName],
                    ["Length", `${listing.length} ft`],
                    ["Sleeps", listing.sleeps],
                    ["Mileage", listing.mileage > 0 ? `${listing.mileage.toLocaleString()} miles` : "New"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-3 text-sm">
                      <span className="text-muted-foreground">{label}</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-4">
                {/* Price Card - Desktop */}
                <div className="hidden rounded-xl bg-card p-5 lg:block">
                  <p className="text-sm text-muted-foreground">{listing.typeName}</p>
                  <h1 className="mt-1 text-xl font-bold text-foreground">
                    {listing.year} {listing.make} {listing.model}
                  </h1>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      ${listing.price.toLocaleString()}
                    </span>
                  </div>
                  <p className={`mt-1 text-sm font-semibold ${dealInfo.textColor}`}>
                    {dealInfo.label}
                  </p>
                  <div className="mt-3 flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    {listing.location}
                  </div>
                </div>

                {/* Contact Seller */}
                <div className="rounded-xl border-2 border-primary bg-card p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-lg font-bold text-foreground">
                      {listing.seller.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{listing.seller.name}</p>
                      <p className="text-xs text-muted-foreground">Member since {listing.seller.memberSince}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" size="lg">
                      <Phone className="mr-2 h-4 w-4" />
                      Show Phone Number
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      <Mail className="mr-2 h-4 w-4" />
                      Email Seller
                    </Button>
                  </div>
                </div>

                {/* Safety Tips */}
                <div className="rounded-xl bg-muted/50 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Stay safe</p>
                      <ul className="mt-1 space-y-1 text-xs text-muted-foreground">
                        <li>Meet seller in a public place</li>
                        <li>Verify ownership documents</li>
                        <li>Get a professional inspection</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
