import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CartPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="p-6 text-center">
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <Link href="/shop">
                    <Button>Continue Shopping</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-lg border border-border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <Button className="w-full" disabled>
                    Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
