import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"
import { AuthCardContent } from "@/components/auth-card-content"

export const metadata: Metadata = {
  title: "Authentication | RVGenius",
  description: "Sign in or create your RVGenius account.",
}

export default function AuthPage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-white">
      <div className="absolute inset-0 hidden sm:block">
        <Image
          src="/images/auth-background-image.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col sm:items-center sm:justify-center">
        <div className="mx-auto w-full max-w-md px-4 py-12 md:max-w-none md:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:grid md:grid-cols-[35%_35%] md:items-center md:justify-center md:gap-0">
            <div className="flex w-full justify-start md:justify-center">
              <Image
                src="/images/rvgenius-logo.svg"
                alt="RVGenius"
                width={180}
                height={32}
                className="h-6 w-auto md:h-10 lg:h-12 md:brightness-0 md:invert"
              />
            </div>

            <div className="flex flex-col gap-8 md:flex md:items-center md:justify-center">
              <div className="w-full flex flex-col gap-10 md:min-h-[600px] md:min-w-[460px] md:max-w-lg md:shrink-0 md:overflow-hidden md:rounded-xl md:bg-white md:px-10 md:py-12">
                <AuthCardContent />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative z-10 border-t border-border bg-white py-4 sm:border-white/20 sm:bg-transparent sm:text-white/80">
        <div className="mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 text-center text-xs text-muted-foreground sm:justify-center sm:gap-6 sm:text-sm">
          <span className="sm:text-white">&copy; {new Date().getFullYear()} RVGenius</span>
          <Link href="#" className="hover:underline sm:text-white/80">Terms</Link>
          <Link href="#" className="hover:underline sm:text-white/80">Privacy</Link>
        </div>
      </footer>
    </main>
  )
}
