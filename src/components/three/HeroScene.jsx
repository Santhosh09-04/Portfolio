import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import {
  ParallaxGroup,
  Shape3D,
  CenterIcosahedron,
  Orb,
  Ring,
  Knot,
  GlowPuff,
} from './LightShapes.jsx'
import { useReducedMotionPreference } from './useMotionPrefs.js'

function ScrollRig({ children }) {
  const group = useRef()
  useFrame((_, delta) => {
    if (!group.current) return
    const scroll = Math.min(window.scrollY, 600)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, scroll * 0.0035, 4, delta)
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, scroll * 0.0012, 4, delta)
  })
  return <group ref={group}>{children}</group>
}

function SceneContent({ light }) {
  const reduced = useReducedMotionPreference()
  const animated = !reduced

  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 6]} intensity={1.05} color="#fff6ee" />
      <pointLight position={[-4, -2, 4]} intensity={1.5} color="#b3a4ff" />
      <pointLight position={[3, 3, -3]} intensity={0.9} color="#ffc3a6" />

      <ParallaxGroup amplitude={0.45}>
        <ScrollRig>
          <GlowPuff position={[0, 0, -0.8]} scale={7} color="138,124,232" />

          <Shape3D enabled={animated} floatSpeed={1.4} floatIntensity={0.55} rotationIntensity={0.35}>
            <CenterIcosahedron radius={1.05} color="#9a8cf5" />
          </Shape3D>

          {light ? (
            <>
              <Orb position={[-1.35, 0.8, 0.4]} size={0.28} color="#7ea6ff" speed={1.4} />
              <Orb position={[1.25, -0.85, 0.6]} size={0.22} color="#ffc3a6" speed={1.1} />
              <Ring position={[1.15, 0.95, -0.3]} radius={0.6} tube={0.02} color="#b3a4ff" speed={1.2} />
            </>
          ) : (
            <>
              <Orb position={[-2.15, 1.05, 0.4]} size={0.32} color="#7ea6ff" speed={1.4} />
              <Orb position={[1.95, -1.35, 0.6]} size={0.24} color="#ffc3a6" speed={1.1} />
              <Ring position={[1.8, 1.3, -0.3]} radius={0.72} tube={0.022} color="#b3a4ff" speed={1.2} />
              <Knot position={[-1.85, -1.05, 0.2]} size={0.28} color="#e8877a" speed={1.1} />
            </>
          )}
        </ScrollRig>
      </ParallaxGroup>

      <ContactShadows
        position={[0, -2.35, 0]}
        opacity={0.32}
        scale={10}
        blur={2.6}
        far={4.5}
        color="#8a6fe8"
      />
    </>
  )
}

export default function HeroScene() {
  const [light, setLight] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setLight(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <Canvas
      dpr={[1, light ? 1.5 : 2]}
      camera={{ position: [0, 0, 8.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <AdaptiveDpr />
      <Suspense fallback={null}>
        <SceneContent light={light} />
      </Suspense>
    </Canvas>
  )
}