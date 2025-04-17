"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

// Sample customer reviews with photos
const customerReviews = [
  {
    id: 1,
    name: "Alex Johnson",
    review:
      "The basketball I purchased from Golden Sports has amazing grip and durability. It's perfect for both indoor and outdoor courts!",
    rating: 5,
    photoUrl: "/placeholder.svg?height=400&width=400&text=Review+Photo+1",
    productName: "Pro Basketball",
  },
  {
    id: 2,
    name: "Sarah Williams",
    review:
      "I've been using the Ultra Running Shoes for my marathon training, and they've been a game-changer. So comfortable and supportive!",
    rating: 5,
    photoUrl: "/placeholder.svg?height=400&width=400&text=Review+Photo+2",
    productName: "Ultra Running Shoes",
  },
  {
    id: 3,
    name: "Michael Chen",
    review:
      "The Smart Fitness Tracker has helped me stay on top of my workouts. The heart rate monitoring is incredibly accurate!",
    rating: 4,
    photoUrl: "/placeholder.svg?height=400&width=400&text=Review+Photo+3",
    productName: "Smart Fitness Tracker",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    review:
      "I bought the Tennis Racket Pro for my daughter who's starting tennis lessons. The quality is excellent, and it's perfect for beginners!",
    rating: 5,
    photoUrl: "/placeholder.svg?height=400&width=400&text=Review+Photo+4",
    productName: "Tennis Racket Pro",
  },
  {
    id: 5,
    name: "David Kim",
    review:
      "The Premium Football has the perfect weight and feel. It's become our go-to for weekend games with friends.",
    rating: 5,
    photoUrl: "/placeholder.svg?height=400&width=400&text=Review+Photo+5",
    productName: "Premium Football",
  },
  {
    id: 6,
    name: "Jessica Thompson",
    review:
      "I'm impressed with the quality of the Adjustable Dumbbells. They're easy to adjust and perfect for my home gym setup.",
    rating: 4,
    photoUrl: "/placeholder.svg?height=400&width=400&text=Review+Photo+6",
    productName: "Adjustable Dumbbells",
  },
]

export function CustomerReviews() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scrolling functionality
    const scrollContainer = containerRef.current
    if (!scrollContainer) return

    let animationId: number
    let startTime: number | null = null
    const totalWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth
    const scrollDuration = 30000 // 30 seconds for a complete scroll

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / scrollDuration, 1)

      if (scrollContainer) {
        scrollContainer.scrollLeft = progress * totalWidth

        // Reset when we reach the end
        if (progress === 1) {
          startTime = timestamp
          scrollContainer.scrollLeft = 0
        }
      }

      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    // Pause scrolling when user interacts with the carousel
    const handleInteraction = () => {
      cancelAnimationFrame(animationId)

      // Resume scrolling after 5 seconds of inactivity
      setTimeout(() => {
        startTime = null
        animationId = requestAnimationFrame(scroll)
      }, 5000)
    }

    scrollContainer.addEventListener("mouseenter", handleInteraction)
    scrollContainer.addEventListener("touchstart", handleInteraction)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener("mouseenter", handleInteraction)
      scrollContainer.removeEventListener("touchstart", handleInteraction)
    }
  }, [])

  return (
    <div className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>

        <div
          ref={containerRef}
          className="flex overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="flex gap-6 min-w-max px-4">
            {customerReviews.map((review) => (
              <motion.div
                key={review.id}
                className="w-[350px] flex-shrink-0 snap-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src={review.photoUrl || "/placeholder.svg"}
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{review.name}</h3>
                        <p className="text-sm text-muted-foreground">{review.productName}</p>
                      </div>
                    </div>

                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>

                    <p className="mb-4 text-foreground/90">{review.review}</p>

                    <div className="relative h-48 w-full rounded-md overflow-hidden">
                      <Image
                        src={review.photoUrl || "/placeholder.svg"}
                        alt={`${review.name}'s review photo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
