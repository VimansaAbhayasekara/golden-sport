"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const brands = [
  { name: "Brook", logo: "/brooks.svg?height=60&width=60&text=NIKE" },
  { name: "New Balance", logo: "/nb.svg?height=60&width=60&text=ADIDAS" },
  { name: "Fila", logo: "/fila.svg?height=60&width=60&text=UNDER+ARMOUR" },
  { name: "Liverpool", logo: "/liverpool.svg?height=60&width=60&text=PUMA" },
  { name: "Wilson", logo: "/wilson.svg?height=60&width=60&text=NEW+BALANCE" },
]

const testimonials = [
  {
    id: 1,
    name: "Isitha Wijesundara",
    role: "Cricket Player",
    image: "/athl5.jpg",
    quote: "Golden Sports equipment has taken my game to the next level. The quality and performance are unmatched.",
  },
  {
    id: 2,
    name: "Kusal Mendis",
    role: "Professional Cricket Player",
    image: "/athl1.jpeg",
    quote: "I've been using Golden Sports gear for years. Their products are essential to my training and competition.",
  },
  {
    id: 3,
    name: "Pathum Nissanka",
    role: "Professional Cricket Player",
    image: "/athl6.jpg",
    quote: "My team's performance improved dramatically after switching to Golden Sports equipment. Highly recommended!",
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

      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
    </section>
  )
}