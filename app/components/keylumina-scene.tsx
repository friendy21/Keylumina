"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

// Spiral/helix shape
function SpiralShape({ position = [0, 0, 0], color = "#8a2be2", scale = 1 }) {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, i * 0.1, 0]} rotation={[0, i * 0.2, 0]}>
          <torusGeometry args={[0.6 - i * 0.05, 0.1, 16, 100]} />
          <meshStandardMaterial
            color={color}
            roughness={0.2}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

// Pink sphere
function PinkSphere({ position = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#ff69b4"
        roughness={0.2}
        metalness={0.3}
        emissive="#ff69b4"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

function BlackHole({ position = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="black" roughness={0.1} metalness={1} emissive="#330033" emissiveIntensity={0.2} />
    </mesh>
  )
}

// Orange donut/torus
function OrangeDonut({ position = [0, 0, 0], scale = 1 }) {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial
        color="#ff8c00"
        roughness={0.2}
        metalness={0.6}
        emissive="#ff8c00"
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

export function KeyluminaScene() {
  return (
    <>
      {/* Black hole on left */}
      <BlackHole position={[-4, 0, 0]} scale={2} />

      {/* Pink spheres */}
      <PinkSphere position={[0, 2, 0]} scale={0.8} />
      <PinkSphere position={[0, -2, 0]} scale={0.8} />

      {/* Orange donut/torus on right */}
      <OrangeDonut position={[5, 0, 0]} scale={1.5} />

      {/* Spiral/helix shape above */}
      <SpiralShape position={[2, 3, -2]} scale={0.8} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={1} color="#FBCF41" />
      <pointLight position={[0, -5, 5]} intensity={0.5} color="#660099" />
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#ff69b4" />
    </>
  )
}

