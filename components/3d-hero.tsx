"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Environment,
  ContactShadows,
  Float,
  Text3D,
  MeshReflectorMaterial,
  MeshDistortMaterial,
  Sparkles,
  PerspectiveCamera,
} from "@react-three/drei"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type * as THREE from "three"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import Image from "next/image"

export function Hero3D() {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-black">
      {/* Image Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/back4.jpg"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-black/30" /> {/* Dark overlay for better text contrast */}
      </div>

      <div className="absolute inset-0 z-10 hero-gradient" />

      <div className="relative z-20 flex h-full items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl ml-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Elevate Your <span className="text-primary">Performance</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80">Premium sports accessories designed for champions</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-8 py-6 text-lg">
                  Shop Now
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 py-6 text-lg text-white border-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}