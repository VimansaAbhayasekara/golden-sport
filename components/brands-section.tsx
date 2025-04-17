"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const brands = [
  { name: "Nike", logo: "/placeholder.svg?height=60&width=120&text=NIKE" },
  { name: "Adidas", logo: "/placeholder.svg?height=60&width=120&text=ADIDAS" },
  { name: "Under Armour", logo: "/placeholder.svg?height=60&width=120&text=UNDER+ARMOUR" },
  { name: "Puma", logo: "/placeholder.svg?height=60&width=120&text=PUMA" },
  { name: "New Balance", logo: "/placeholder.svg?height=60&width=120&text=NEW+BALANCE" },
]

const testimonials = [
  {
    id: 1,
    name: "Michael Johnson",
    role: "Professional Basketball Player",
    image: "/placeholder.svg?height=400&width=300&text=Athlete+1",
    quote: "Golden Sports equipment has taken my game to the next level. The quality and performance are unmatched.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Olympic Gold Medalist",
    image: "/placeholder.svg?height=400&width=300&text=Athlete+2",
    quote: "I've been using Golden Sports gear for years. Their products are essential to my training and competition.",
  },
  {
    id: 3,
    name: "David Chen",
    role: "Football Coach",
    image: "/placeholder.svg?height=400&width=300&text=Athlete+3",
    quote:
      "My team's performance improved dramatically after switching to Golden Sports equipment. Highly recommended!",
  },
]

export function BrandsSection() {
  return (
    <section className="bg-black py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-8xl md:text-9xl font-bold text-primary mb-16 text-center"
        >
          SHINE
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30, rotateY: 30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden transform perspective-1000"
            >
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                <p className="text-primary text-sm mb-2">{testimonial.role}</p>
                <p className="text-white/80 text-sm">{testimonial.quote}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-bold mb-2">Trusted by the best brands</h3>
          <p className="text-white/60">
            We partner with leading sports brands to bring you the highest quality products
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={120}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-16 space-x-6">
          {["tiktok", "instagram", "snapchat", "youtube", "facebook"].map((platform) => (
            <motion.div
              key={platform}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Image
                src={`/placeholder.svg?height=24&width=24&text=${platform}`}
                alt={platform}
                width={24}
                height={24}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
    </section>
  )
}
