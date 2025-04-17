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



export function ProductShowcase() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-[500px]"
          >
          </motion.div>
        </div>
      </div>
    </div>
  )
}
