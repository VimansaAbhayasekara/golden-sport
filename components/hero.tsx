"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BasketballScene } from "@/components/3d/basketball"
import { Button } from "@/components/ui/button"

export function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-10 hero-gradient" />

      <div className="relative z-20 flex h-full items-center">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Elevate Your <span className="text-primary">Game</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              With the premium sports accessories from Golden Sports
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button size="lg" className="rounded-full px-8">
                Shop Now
              </Button>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="relative h-[400px]"
            >
              <BasketballScene />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
