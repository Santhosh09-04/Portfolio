import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import useWindowPointer from './useWindowPointer.js'

/* -------------------------------------------------------------------------- */
/* Pointer parallax parent — gently tilts children toward the cursor          */
/* -------------------------------------------------------------------------- */
export function ParallaxGroup({ children, amplitude = 0.4, amplitudeY }) {
  const ref = useRef()
  const { target } = useWindowPointer()
  const ampY = amplitudeY ?? amplitude * 0.7

  useFrame((state, delta) => {
    if (!ref.current) return
    const group = ref.current
    group.rotation.y = THREE.MathUtils.damp(group.rotation.y, target.current.x * amplitude, 4, delta)
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, target.current.y * ampY, 4, delta)
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.015
    group.scale.setScalar(s)
  })

  return <group ref={ref}>{children}</group>
}

/* -------------------------------------------------------------------------- */
/* Soft additive glow sprite (no external assets)                             */
/* -------------------------------------------------------------------------- */
function useGlowTexture(color) {
  return useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')
    const grad = ctx.createRadialGradient(size / 2, size / 2, 8, size / 2, size / 2, size / 2)
    grad.addColorStop(0, `rgba(${color}, 0.55)`)
    grad.addColorStop(0.5, `rgba(${color}, 0.16)`)
    grad.addColorStop(1, `rgba(${color}, 0)`)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [color])
}

export function GlowPuff({ position = [0, 0, 0], scale = 4, color = '138,124,232' }) {
  const map = useGlowTexture(color)
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.material.opacity = 0.5 + Math.sin(t * 0.8) * 0.14
  })
  return (
    <sprite position={position} scale={[scale, scale, 1]} ref={ref}>
      <spriteMaterial
        map={map}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        opacity={0.6}
      />
    </sprite>
  )
}
/* -------------------------------------------------------------------------- */
/* Generic float wrapper                                                      */
/* -------------------------------------------------------------------------- */
export function Shape3D({
  children,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  floatSpeed = 1.2,
  floatIntensity = 0.5,
  rotationIntensity = 0.5,
  enabled = true,
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {enabled ? (
        <Float speed={floatSpeed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
          {children}
        </Float>
      ) : (
        children
      )}
    </group>
  )
}

/* Hero centerpiece: tinted icosahedron with a delicate wireframe shell */
export function CenterIcosahedron({ radius = 1.1, color = '#9a8cf5', wireColor = '#ffffff', dark = false }) {
  const core = useRef()
  useFrame((state, delta) => {
    if (!core.current) return
    core.current.rotation.x += delta * 0.16
    core.current.rotation.y += delta * 0.24
  })
  return (
    <group ref={core}>
      <mesh>
        <icosahedronGeometry args={[radius, 0]} />
        <meshStandardMaterial
          color={color}
          flatShading
          roughness={0.34}
          metalness={0.06}
          envMapIntensity={0.6}
        />
      </mesh>
      {dark ? null : (
        <mesh scale={1.14}>
          <icosahedronGeometry args={[radius, 0]} />
          <meshBasicMaterial color={wireColor} wireframe transparent opacity={0.32} depthWrite={false} />
        </mesh>
      )}
    </group>
  )
}

export function Orb({ position = [0, 0, 0], size = 0.5, color = '#7ea6ff', speed = 1 }) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.4 * speed
    ref.current.rotation.y += delta * 0.5 * speed
  })
  return (
    <group position={position}>
      <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.9}>
        <mesh ref={ref}>
          <icosahedronGeometry args={[size, 0]} />
          <meshStandardMaterial color={color} flatShading roughness={0.4} />
        </mesh>
      </Float>
    </group>
  )
}

export function Ring({ position = [0, 0, 0], radius = 0.9, tube = 0.02, color = '#b3a4ff', speed = 1 }) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.25 * speed
    ref.current.rotation.z += delta * 0.18 * speed
  })
  return (
    <group position={position}>
      <Float speed={1.4 * speed} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh ref={ref}>
          <torusGeometry args={[radius, tube, 12, 48]} />
          <meshStandardMaterial color={color} metalness={0.4} roughness={0.35} transparent opacity={0.85} />
        </mesh>
      </Float>
    </group>
  )
}

export function Knot({ position = [0, 0, 0], size = 0.42, color = '#e8877a', speed = 1 }) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.5 * speed
    ref.current.rotation.y -= delta * 0.35 * speed
  })
  return (
    <group position={position}>
      <Float speed={1.15 * speed} rotationIntensity={0.5} floatIntensity={0.6}>
        <mesh ref={ref}>
          <torusKnotGeometry args={[size, size * 0.32, 64, 8, 2, 3]} />
          <meshStandardMaterial color={color} metalness={0.35} roughness={0.32} />
        </mesh>
      </Float>
    </group>
  )
}

export function Diamond({ position = [0, 0, 0], size = 0.42, color = '#a99bff', speed = 1 }) {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.45 * speed
  })
  return (
    <group position={position}>
      <Float speed={1.3 * speed} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={ref}>
          <octahedronGeometry args={[size, 0]} />
          <meshStandardMaterial color={color} flatShading roughness={0.35} />
        </mesh>
      </Float>
    </group>
  )
}