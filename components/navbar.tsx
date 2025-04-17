"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Only add the event listener on the client side
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">GOLDEN</span>
          <span className="text-2xl font-bold text-blue-600">SPORTS</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/shop"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/shop" ? "text-primary" : "text-foreground/80"}`}
          >
            Shop
          </Link>
          <Link
            href="/discover"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/discover" ? "text-primary" : "text-foreground/80"}`}
          >
            Discover
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/about" ? "text-primary" : "text-foreground/80"}`}
          >
            About
          </Link>
          <Link
            href="/support"
            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/support" ? "text-primary" : "text-foreground/80"}`}
          >
            Support
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                0
              </span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
