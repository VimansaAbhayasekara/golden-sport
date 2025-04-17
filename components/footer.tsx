import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-primary">GOLDEN</span>
              <span className="text-2xl font-bold text-blue-600">SPORTS</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Premium sports accessories for athletes and enthusiasts. Elevate your game with Golden Sports.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/basketball" className="text-muted-foreground hover:text-primary text-sm">
                  Basketball
                </Link>
              </li>
              <li>
                <Link href="/category/football" className="text-muted-foreground hover:text-primary text-sm">
                  Football
                </Link>
              </li>
              <li>
                <Link href="/category/tennis" className="text-muted-foreground hover:text-primary text-sm">
                  Tennis
                </Link>
              </li>
              <li>
                <Link href="/category/fitness" className="text-muted-foreground hover:text-primary text-sm">
                  Fitness
                </Link>
              </li>
              <li>
                <Link href="/category/running" className="text-muted-foreground hover:text-primary text-sm">
                  Running
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-primary text-sm">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="mt-2 flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-muted px-3 py-2 text-sm rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-r-md">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Golden Sports. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
