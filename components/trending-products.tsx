"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase/client"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  slug: string
  price: number
  sale_price: number | null
  images: { url: string; alt_text: string }[]
}

export function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("id, name, slug, price, sale_price")
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Trending Now</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Trending Now</h2>
        <Link href="/shop" className="text-primary hover:underline font-medium">
          View All
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/product/${product.slug}`} className="block group">
              <div className="relative aspect-[4/5] bg-muted rounded-lg overflow-hidden mb-3">
                {product.images && product.images[0] ? (
                  <Image
                    src={product.images[0].url || "/placeholder.svg?height=500&width=400"}
                    alt={product.images[0].alt_text || product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>
              <h3 className="font-medium text-foreground mb-1">{product.name}</h3>
              <div>
                {product.sale_price ? (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">${product.sale_price.toFixed(2)}</span>
                    <span className="text-sm line-through text-muted-foreground">${product.price.toFixed(2)}</span>
                  </div>
                ) : (
                  <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
