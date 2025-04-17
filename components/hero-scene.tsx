"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Environment, PresentationControls, ContactShadows, Html } from "@react-three/drei"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

function Model({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.y = Math.sin(t / 4) / 4
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  return <primitive ref={ref} object={scene} scale={scale} position={position} rotation={rotation} />
}

function HeroContent() {
  const { viewport } = useThree()
  const isMobile = viewport.width < 768

  return (
    <Html transform position={[0, isMobile ? -1 : -1.5, 0]} className="w-full" center distanceFactor={10}>
      <div className="text-center px-4 w-full max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Elevate Your <span className="text-primary">Game</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          With premium sports accessories from Golden Sports
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Button size="lg" className="rounded-full px-8">
            Shop Now
          </Button>
        </motion.div>
      </div>
    </Html>
  )
}

export function HeroScene() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />

          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <Model scale={2.5} position={[0, 0, 0]} rotation={[0, 0, 0]} />
            <HeroContent />
          </PresentationControls>

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.4} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
