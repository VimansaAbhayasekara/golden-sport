"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  sale_price: number | null
  images: { url: string; alt_text: string }[]
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("id, name, slug, description, price, sale_price")
          .eq("featured", true)
          .limit(4)

        if (productsError) throw productsError

        const productsWithImages = await Promise.all(
          productsData.map(async (product) => {
            const { data: imagesData, error: imagesError } = await supabase
              .from("product_images")
              .select("url, alt_text")
              .eq("product_id", product.id)
              .eq("is_primary", true)
              .limit(1)

            if (imagesError) throw imagesError

            return {
              ...product,
              images: imagesData || [],
            }
          }),
        )

        setProducts(productsWithImages)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="product-card">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="w-full h-64 bg-muted animate-pulse rounded-md mb-4" />
                <div className="w-3/4 h-6 bg-muted animate-pulse rounded-md mb-2" />
                <div className="w-1/2 h-4 bg-muted animate-pulse rounded-md mb-4" />
                <div className="w-1/3 h-8 bg-muted animate-pulse rounded-md" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/product/${product.slug}`}>
              <Card className="product-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-64 w-full bg-muted">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0].url || "/placeholder.svg"}
                        alt={product.images[0].alt_text || product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted">
                        <span className="text-muted-foreground">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.sale_price ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">${product.sale_price.toFixed(2)}</span>
                            <span className="text-sm line-through text-muted-foreground">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      <Button size="sm" variant="secondary" className="rounded-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
