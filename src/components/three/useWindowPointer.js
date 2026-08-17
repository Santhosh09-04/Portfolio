import { useEffect, useRef } from 'react'

/**
 * Tracks the mouse pointer across the whole window (works even when the
 * WebGL canvas has pointer-events: none). Returns a normalised target in
 * [-1, 1] plus a smoöthened ref you can read inside useFrame.
 */
export default function useWindowPointer(speed = 4) {
  const target = useRef({ x: 0, y: 0 })
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return { speed, target, pointer }
}