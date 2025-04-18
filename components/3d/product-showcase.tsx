"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  Environment,
  ContactShadows,
  OrbitControls,
  Text3D,
  Float,
  PresentationControls,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Sparkles,
} from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import * as THREE from "three"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import Image from "next/image"

export function ProductShowcase() {
  return (
    <div className="relative py-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/back1.jpg"
          alt="Premium Sports Equipment"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Semi-transparent overlay */}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[500px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/90 dark:bg-black/80 backdrop-blur-sm p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience Premium Quality</h2>
            <p className="text-muted-foreground mb-6">
              Our sports equipment is crafted with precision and care, using only the highest quality materials.
              Designed for athletes who demand the best, our products deliver exceptional performance and durability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="lg" className="rounded-full">
                  Explore Products
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Empty column to maintain grid layout - can be removed if not needed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-[500px] hidden md:block" // Hidden on mobile if you want
          />
        </div>
      </div>
    </div>
  )
}