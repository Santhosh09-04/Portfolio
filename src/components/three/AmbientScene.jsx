import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'
import { ParallaxGroup, Orb, Ring, Knot, Diamond, GlowPuff } from './LightShapes.jsx'
import { useReducedMotionPreference } from './useMotionPrefs.js'

function DriftLayer({ children, factor = 1 }) {
  const group = useRef()
  useFrame((_, delta) => {
    if (!group.current) return
    const targetY = window.scrollY * -0.028 * factor
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, targetY, 3, delta)
  })
  return <group ref={group}>{children}</group>
}

function SceneContent({ light }) {
  const reduced = useReducedMotionPreference()
  const animated = !reduced

  return (
    <>
      <ambientLight intensity={1.0} />
      <directionalLight position={[3, 5, 5]} intensity={0.85} color="#fff6ee" />
      <pointLight position={[-4, 0, 3]} intensity={0.9} color="#b3a4ff" />

      <ParallaxGroup amplitude={0.3}>
        <DriftLayer>
          {light ? (
            <>
              <Orb position={[0, 3.3, -2.5]} size={0.5} color="#c3b6ff" speed={0.5} />
              <Ring position={[2.1, -1.9, -3]} radius={0.55} tube={0.02} color="#c9b8ff" speed={0.7} />
              <Knot position={[-2.3, 0.5, -2]} size={0.28} color="#ffc9a6" speed={0.6} />
              <Diamond position={[1.6, 2.1, -3.5]} size={0.3} color="#a9d0ff" speed={0.6} />
              <GlowPuff position={[-2, -3, -4]} scale={5} color="255,195,166" />
            </>
          ) : (
            <>
              <Diamond position={[-4.7, 1.6, -1]} size={0.5} color="#a99bff" speed={0.9} />
              <Orb position={[4.9, -2.1, -2]} size={0.62} color="#b9c9ff" speed={0.7} />
              <Ring position={[5.3, 2.5, -3]} radius={0.68} tube={0.02} color="#c9b8ff" speed={0.8} />
              <Knot position={[-5.3, -1.5, -2]} size={0.34} color="#ffc9a6" speed={0.7} />
              <Orb position={[-3.3, 3.2, -3.5]} size={0.28} color="#ffd9c0" speed={0.6} />
              <Diamond position={[3.1, 3.5, -4]} size={0.34} color="#a9d0ff" speed={0.6} />
              <GlowPuff position={[-4, -2.8, -4]} scale={5} color="255,195,166" />
            </>
          )}
        </DriftLayer>
      </ParallaxGroup>
    </>
  )
}

export default function AmbientScene() {
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
      camera={{ position: [0, 0, 9], fov: 42 }}
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