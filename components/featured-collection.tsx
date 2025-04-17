"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function FeaturedCollection() {
  return (
    <div className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pro Kookaburra Collection</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Elevate your game with our professional-grade Kookaburra equipment. Designed for serious players who
              demand the best.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/category/basketball">
                <Button size="lg" className="rounded-full">
                  Shop Collection
                </Button>
              </Link>
              <Link href="/discover">
                <Button variant="outline" size="lg" className="rounded-full">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] rounded-lg overflow-hidden"
          >
            <Image
              src="/combo3.JPG"
              alt="Pro Basketball Collection"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
