"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { FootballScene } from "@/components/3d/football"

interface Category {
  id: string
  name: string
  slug: string
  description: string
}

export function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase.from("categories").select("id, name, slug, description")

        if (error) throw error

        setCategories(data || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="w-full h-32 bg-muted animate-pulse rounded-md mb-4" />
                  <div className="w-1/2 h-6 bg-muted animate-pulse rounded-md mb-2" />
                  <div className="w-3/4 h-4 bg-muted animate-pulse rounded-md" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore Categories</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4">Premium Sports Equipment</h3>
            <p className="text-muted-foreground mb-6">
              Discover our collection of high-quality sports equipment designed for professionals and enthusiasts alike.
              Each product is crafted with precision to enhance your performance.
            </p>
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-medium"
              >
                Browse All Categories
              </motion.button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <FootballScene />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/category/${category.slug}`}>
                <Card className="h-full hover:bg-muted/50 transition-colors">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
