"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Michael Johnson",
    role: "Professional Basketball Player",
    content:
      "The quality of Golden Sports equipment is unmatched. I've been using their basketballs for years and they've never let me down.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Tennis Coach",
    content:
      "As a tennis coach, I need reliable equipment for my students. Golden Sports provides the perfect balance of quality and affordability.",
    rating: 5,
  },
  {
    id: 3,
    name: "David Chen",
    role: "Fitness Enthusiast",
    content:
      "The fitness trackers from Golden Sports have transformed my workout routine. The accuracy and features are incredible for the price.",
    rating: 4,
  },
]

export function Testimonials() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Don't just take our word for it. Here's what athletes and sports enthusiasts have to say about Golden Sports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "text-primary fill-primary" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <p className="mb-6 text-foreground/90">{testimonial.content}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
