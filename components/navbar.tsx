"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const navItems = [
    { name: "Shop", href: "/shop" },
    { name: "Discover", href: "/discover" },
    { name: "About", href: "/about" },
    { name: "Support", href: "/support" },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}>
      <div className="container mx-auto px-4">
        <div className="bg-black/90 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">GOLDEN</span>
            <span className="text-2xl font-bold text-blue-600">SPORTS</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-white/10 text-primary"
                    : "text-white/80 hover:bg-white/10 hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Link href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  0
                </span>
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md mt-2 px-4 py-4 rounded-2xl mx-4"
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-white/10 text-primary"
                      : "text-white/80 hover:bg-white/10 hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
