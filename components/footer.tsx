import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">For Buyers</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Browse RVs</Link></li>
              <li><Link href="/?type=class-a" className="hover:text-foreground">Class A Motorhomes</Link></li>
              <li><Link href="/?type=travel-trailer" className="hover:text-foreground">Travel Trailers</Link></li>
              <li><Link href="#" className="hover:text-foreground">RV Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">For Sellers</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/dashboard" className="hover:text-foreground">Sell Your RV</Link></li>
              <li><Link href="#" className="hover:text-foreground">Pricing Guide</Link></li>
              <li><Link href="#" className="hover:text-foreground">Seller Resources</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="hover:text-foreground">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="hover:text-foreground">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-foreground">Safety Tips</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="white" strokeWidth="2">
                <path d="M3 18V9a2 2 0 012-2h14a2 2 0 012 2v9" strokeLinecap="round" />
                <path d="M3 18h18" strokeLinecap="round" />
                <circle cx="7" cy="18" r="2" fill="white" stroke="none" />
                <circle cx="17" cy="18" r="2" fill="white" stroke="none" />
              </svg>
            </div>
            <span className="font-bold text-foreground">RVMarket</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} RVMarket. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
