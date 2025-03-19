"use client"

import { useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { MeshDistortMaterial, MeshWobbleMaterial, Text, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import { gsap } from "gsap"

// Interactive object with advanced effects
function AdvancedInteractiveObject({
  position = [0, 0, 0],
  color = "#ff69b4",
  scale = 1,
  geometry = "sphere",
  args = [1, 32, 32],
  distort = false,
  wobble = false,
  emissive = false,
  sparkles = false,
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const originalPosition = useRef(new THREE.Vector3(...position))
  const originalScale = useRef(scale)

  const handleClick = () => {
    if (isAnimating || !meshRef.current) return

    setIsAnimating(true)

    // Calculate direction away from center
    const direction = new THREE.Vector3(...position).normalize()

    // Animate moving back
    gsap.to(meshRef.current!.position, {
      x: originalPosition.current.x + direction.x * 2,
      y: originalPosition.current.y + direction.y * 2,
      z: originalPosition.current.z + direction.z * 2,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // Animate returning to original position
        gsap.to(meshRef.current!.position, {
          x: originalPosition.current.x,
          y: originalPosition.current.y,
          z: originalPosition.current.z,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          onComplete: () => {
            setIsAnimating(false)
          },
        })
      },
    })

    // Add a spin effect
    gsap.to(meshRef.current!.rotation, {
      y: meshRef.current!.rotation.y + Math.PI * 2,
      duration: 1.3,
      ease: "power2.inOut",
    })
  }

  // Handle hover effects
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer"
    setIsHovered(true)

    if (meshRef.current && !isAnimating) {
      gsap.to(meshRef.current.scale, {
        x: originalScale.current * 1.1,
        y: originalScale.current * 1.1,
        z: originalScale.current * 1.1,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const handlePointerOut = () => {
    document.body.style.cursor = "default"
    setIsHovered(false)

    if (meshRef.current && !isAnimating) {
      gsap.to(meshRef.current.scale, {
        x: originalScale.current,
        y: originalScale.current,
        z: originalScale.current,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  useFrame((state) => {
    if (!meshRef.current || isAnimating) return

    // Subtle floating animation when not being clicked
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = originalPosition.current.y + Math.sin(time * 0.5) * 0.1
    meshRef.current.rotation.y += 0.002
  })

  // Render different geometries based on the geometry prop
  const renderGeometry = () => {
    switch (geometry) {
      case "sphere":
        return <sphereGeometry args={args as [number, number, number]} />
      case "torus":
        return <torusGeometry args={args as [number, number, number, number]} />
      case "box":
        return <boxGeometry args={args as [number, number, number]} />
      case "capsule":
        return <capsuleGeometry args={args as [number, number, number, number]} />
      default:
        return <sphereGeometry args={args as [number, number, number]} />
    }
  }

  // Render different materials based on props
  const renderMaterial = () => {
    if (distort) {
      return (
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={isHovered ? 0.6 : 0.3}
          roughness={0.2}
          metalness={0.8}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.5 : 0}
        />
      )
    } else if (wobble) {
      return (
        <MeshWobbleMaterial
          color={color}
          factor={isHovered ? 1 : 0.4}
          speed={isHovered ? 5 : 2}
          roughness={0.2}
          metalness={0.8}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.5 : 0}
        />
      )
    } else {
      return (
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          emissive={emissive ? color : "#000000"}
          emissiveIntensity={emissive ? 0.5 : 0}
        />
      )
    }
  }

  return (
    <group position={position as [number, number, number]}>
      <mesh
        ref={meshRef}
        scale={scale}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {renderGeometry()}
        {renderMaterial()}
      </mesh>

      {sparkles && <Sparkles count={50} scale={scale * 3} size={1.5} speed={0.3} color={color} />}
    </group>
  )
}

// Enhanced character model with more details and animations
function EnhancedCharacter({ position = [0, 0, 0], scale = 1 }) {
  const group = useRef<THREE.Group>(null)
  const bodyRef = useRef<THREE.Mesh>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const originalPosition = useRef(new THREE.Vector3(...position))
  const { mouse, viewport } = useThree()

  const handleClick = () => {
    if (isAnimating || !group.current) return

    setIsAnimating(true)

    // Jump animation
    gsap.to(group.current!.position, {
      y: originalPosition.current.y + 2,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // Fall back down with bounce
        gsap.to(group.current!.position, {
          y: originalPosition.current.y,
          duration: 0.8,
          ease: "bounce.out",
          onComplete: () => {
            setIsAnimating(false)
          },
        })
      },
    })

    // Spin while jumping
    gsap.to(group.current!.rotation, {
      y: group.current!.rotation.y + Math.PI * 2,
      duration: 1.3,
      ease: "power2.inOut",
    })
  }

  // Handle hover effects
  const handlePointerOver = () => {
    document.body.style.cursor = "pointer"
    setIsHovered(true)

    if (group.current && !isAnimating) {
      gsap.to(group.current.scale, {
        x: scale * 1.1,
        y: scale * 1.1,
        z: scale * 1.1,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const handlePointerOut = () => {
    document.body.style.cursor = "default"
    setIsHovered(false)

    if (group.current && !isAnimating) {
      gsap.to(group.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  useFrame((state) => {
    if (!group.current || isAnimating) return

    // Subtle animation
    const time = state.clock.getElapsedTime()
    group.current.position.y = originalPosition.current.y + Math.sin(time * 0.5) * 0.1

    // Eye tracking if refs are set
    if (leftEyeRef.current && rightEyeRef.current) {
      const x = (mouse.x * viewport.width) / 2
      const y = (mouse.y * viewport.height) / 2

      leftEyeRef.current.lookAt(new THREE.Vector3(x, y, 10))
      rightEyeRef.current.lookAt(new THREE.Vector3(x, y, 10))

      const maxRotation = 0.3
      leftEyeRef.current.rotation.x = THREE.MathUtils.clamp(leftEyeRef.current.rotation.x, -maxRotation, maxRotation)
      leftEyeRef.current.rotation.y = THREE.MathUtils.clamp(leftEyeRef.current.rotation.y, -maxRotation, maxRotation)
      rightEyeRef.current.rotation.x = THREE.MathUtils.clamp(rightEyeRef.current.rotation.x, -maxRotation, maxRotation)
      rightEyeRef.current.rotation.y = THREE.MathUtils.clamp(rightEyeRef.current.rotation.y, -maxRotation, maxRotation)
    }
  })

  return (
    <group
      ref={group}
      position={position as [number, number, number]}
      scale={scale}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Body */}
      <mesh ref={bodyRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color="#ff69b4"
          speed={2}
          distort={isHovered ? 0.4 : 0.2}
          roughness={0.2}
          metalness={0.3}
          emissive="#ff69b4"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Eyes */}
      <group position={[-0.3, 0.3, 0.8]}>
        <mesh ref={leftEyeRef}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="black" roughness={0.1} />
        </mesh>
      </group>
      <group position={[0.3, 0.3, 0.8]}>
        <mesh ref={rightEyeRef}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="black" roughness={0.1} />
        </mesh>
      </group>

      {/* Arms */}
      <mesh position={[-1, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <capsuleGeometry args={[0.2, 0.8, 8, 16]} />
        <meshStandardMaterial color="#ff69b4" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.4, -1.2, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.2, 0.8, 8, 16]} />
        <meshStandardMaterial color="#ff69b4" roughness={0.2} metalness={0.3} />
      </mesh>
      <mesh position={[0.4, -1.2, 0]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.2, 0.8, 8, 16]} />
        <meshStandardMaterial color="#ff69b4" roughness={0.2} metalness={0.3} />
      </mesh>

      {/* Hat */}
      <mesh position={[0, 1, 0]}>
        <coneGeometry args={[0.3, 0.5, 16]} />
        <meshStandardMaterial color="green" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Sparkles around character */}
      <Sparkles count={30} scale={3} size={0.6} speed={0.3} color="#ff69b4" />
    </group>
  )
}

export function EnhancedScene() {
  return (
    <>
      {/* Large blue sphere at top */}
      <AdvancedInteractiveObject
        position={[0, 3, -5]}
        color="#4287f5"
        scale={3}
        distort={true}
        emissive={true}
        sparkles={true}
      />

      {/* Small blue sphere on left */}
      <AdvancedInteractiveObject position={[-5, 0, -2]} color="#4287f5" scale={0.5} wobble={true} />

      {/* Pink character */}
      <EnhancedCharacter position={[-3, -1, 0]} scale={1.2} />

      {/* Pink/purple ring/donut */}
      <AdvancedInteractiveObject
        position={[5, 2, -2]}
        color="#c341f5"
        scale={1.5}
        geometry="torus"
        args={[1, 0.4, 16, 100]}
        emissive={true}
      />

      {/* Blue pill-shaped object */}
      <AdvancedInteractiveObject
        position={[3, 0, 1]}
        color="#42c5f5"
        scale={1.2}
        geometry="capsule"
        args={[0.3, 1, 8, 16]}
        wobble={true}
      />

      {/* Rainbow-colored tablet/device */}
      <AdvancedInteractiveObject position={[4, -2, -1]} color="#f54291" scale={1} geometry="box" args={[2, 3, 0.1]} />

      {/* 3D Text */}
      <group position={[0, -4, 0]}>
        <Text fontSize={0.8} color="#660099" anchorX="center" anchorY="middle" font="/fonts/Inter-Bold.ttf">
          Motion Design
        </Text>
      </group>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={1} color="#FBCF41" />
      <pointLight position={[0, -5, 5]} intensity={0.5} color="#660099" />
      <pointLight position={[3, 3, 3]} intensity={0.8} color="#ff69b4" />

      {/* Global sparkles */}
      <Sparkles count={100} scale={20} size={2} speed={0.3} opacity={0.5} />
    </>
  )
}

