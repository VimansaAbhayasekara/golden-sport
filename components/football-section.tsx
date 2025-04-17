"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FootballSection() {
  return (
    <section className="bg-black py-24 relative overflow-hidden min-h-screen">
      {/* Full-cover background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/back6.jpg"
          alt="Football Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Dark overlay for better text contrast */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-8xl md:text-9xl font-bold text-primary mb-16 text-center"
          >
            POWER
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h3 className="text-3xl font-bold mb-4 text-white">Unleash Your Game Potential</h3>
            <p className="text-white/80 mb-8">
              From professional-grade footballs to advanced training equipment, elevate your performance with our
              premium sports gear.
            </p>
            <Link href="/shop">
              <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                Explore Collection
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}