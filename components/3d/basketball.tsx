"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei"
import type { Mesh } from "three"

function BasketballModel(props: any) {
  const meshRef = useRef<Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  // This is a placeholder model - in a real app, you'd use an actual basketball model
  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#e67e22"
        roughness={0.8}
        metalness={0.1}
        emissive={hovered ? "#e67e22" : "#000000"}
        emissiveIntensity={hovered ? 0.3 : 0}
      />
    </mesh>
  )
}

export function BasketballScene() {
  return (
    <div className="canvas-container h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <BasketballModel position={[0, 0, 0]} />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
        <Environment preset="city" />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  )
}
