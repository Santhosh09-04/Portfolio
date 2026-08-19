import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { GlowPuff } from './LightShapes.jsx'

function SceneContent() {
  return (
    <>
      <ambientLight intensity={1.0} />
      <directionalLight position={[3, 5, 5]} intensity={0.85} color="#fff6ee" />
      <pointLight position={[-4, 0, 3]} intensity={0.9} color="#b3a4ff" />
      <GlowPuff position={[-3, -2, -4]} scale={6} color="138,124,232" />
      <GlowPuff position={[3, 2, -4]} scale={5} color="255,195,166" />
    </>
  )
}

export default function AmbientScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <AdaptiveDpr />
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}