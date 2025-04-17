"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei"
import type { Mesh } from "three"

function FootballModel(props: any) {
  const meshRef = useRef<Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x += 0.002
    }
  })

  // This is a placeholder model - in a real app, you'd use an actual football model
  return (
    <mesh {...props} ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.2} />
    </mesh>
  )
}

export function FootballScene() {
  return (
    <div className="canvas-container h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <FootballModel position={[0, 0, 0]} />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
