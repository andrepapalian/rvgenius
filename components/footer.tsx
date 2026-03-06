import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-primary/30 bg-[oklch(0.20_0.01_248.82)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 text-primary-foreground">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold">For Buyers</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/" className="hover:text-primary-foreground">Browse RVs</Link></li>
              <li><Link href="/?type=class-a" className="hover:text-primary-foreground">Class A Motorhomes</Link></li>
              <li><Link href="/?type=travel-trailer" className="hover:text-primary-foreground">Travel Trailers</Link></li>
              <li><Link href="#" className="hover:text-primary-foreground">RV Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">For Sellers</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="/auth" className="hover:text-primary-foreground">Sign Up</Link></li>
              <li><Link href="#" className="hover:text-primary-foreground">Pricing Guide</Link></li>
              <li><Link href="#" className="hover:text-primary-foreground">Seller Resources</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="#" className="hover:text-primary-foreground">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary-foreground">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary-foreground">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Support</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li><Link href="#" className="hover:text-primary-foreground">Help Center</Link></li>
              <li><Link href="#" className="hover:text-primary-foreground">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-primary-foreground">Safety Tips</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary/30 pt-8 sm:flex-row">
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/rvgenius-logo.svg"
              alt="RVGenius"
              width={120}
              height={20}
              className="h-5 w-auto brightness-0 invert"
            />
          </Link>
          <p className="text-sm text-primary-foreground/80">
            &copy; {new Date().getFullYear()} RVGenius. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/80">
            <Link href="#" className="hover:text-primary-foreground">Terms</Link>
            <Link href="#" className="hover:text-primary-foreground">Privacy</Link>
            <Link href="#" className="hover:text-primary-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
