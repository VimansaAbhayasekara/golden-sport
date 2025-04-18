"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

// Mock Instagram posts
const instagramPosts = [
  { id: 1, imageUrl: "/post1.jpg?height=400&width=400", likes: 245 },
  { id: 2, imageUrl: "/post6.jpg?height=400&width=400", likes: 189 },
  { id: 3, imageUrl: "/post3.jpg?height=400&width=400", likes: 321 },
  { id: 4, imageUrl: "/post4.jpg?height=400&width=400", likes: 176 },
  { id: 5, imageUrl: "/post2.png?height=400&width=400", likes: 298 },
  { id: 6, imageUrl: "/post5.jpg?height=400&width=400", likes: 210 },
]

export function InstagramFeed() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Follow Us on Instagram</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            @goldensports • Join our community and share your sports moments with us
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square group"
            >
              <Image
                src={post.imageUrl || "/placeholder.svg"}
                alt={`Instagram post ${post.id}`}
                fill
                className="object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-md">
                <div className="text-white flex items-center">
                  <span className="font-semibold">{post.likes}</span>
                  <span className="ml-1">❤️</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="https://www.instagram.com/golden_sports_online/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline"
          >
            <Instagram className="h-5 w-5 mr-2" />
            <span>View More on Instagram</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
