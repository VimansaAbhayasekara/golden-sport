"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

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
      <div className="relative h-screen w-full">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
          <div className="w-full">
            <div className="w-3/4 h-12 bg-white/30 animate-pulse rounded-md mb-6 mx-auto" />
            <div className="w-1/2 h-6 bg-white/30 animate-pulse rounded-md mb-8 mx-auto" />
            <div className="flex justify-center gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-48 h-64 bg-white/30 animate-pulse rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full">
      {/* Background Cover Image */}
      <Image
        src="/cover4.jpg"
        alt="Sports Equipment"
        fill
        className="object-cover"
        priority
        quality={100}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
        {/* Main Heading and Description */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Premium Sports Equipment
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
          >
            Discover our collection of high-quality sports equipment designed for professionals and enthusiasts alike.
            Each product is crafted with precision to enhance your performance.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <Link href={`/category/${category.slug}`}>
                <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <h3 className="font-semibold text-lg text-white mb-2">{category.name}</h3>
                    <p className="text-sm text-white/70">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:bg-primary/90 transition-colors"
            >
              Browse All Categories
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}