import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Soft custom cursor: small dot + lagging ring that grows over interactive
 * elements. Only enabled on fine pointers (desktops / trackpads).
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const rx = useSpring(x, { stiffness: 500, damping: 42, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 500, damping: 42, mass: 0.6 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(pointer: fine)').matches) return

    setEnabled(true)
    // hide the native cursor (component unmount restores it)
    const style = document.createElement('style')
    style.id = 'custom-cursor-style'
    style.textContent = '* { cursor: none !important; }'
    document.head.appendChild(style)

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) =>
      setHovering(!!e.target.closest('a, button, input, textarea, select, [data-cursor="hover"]'))
    const down = () => setPressed(true)
    const up = () => setPressed(false)

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.getElementById('custom-cursor-style')?.remove()
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[130] h-2.5 w-2.5 rounded-full bg-ac-lav shadow-[0_0_12px_rgba(138,111,232,0.8)]"
        style={{ x, y, marginLeft: -5, marginTop: -5 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[129] h-9 w-9 rounded-full border"
        style={{ x: rx, y: ry, marginLeft: -18, marginTop: -18 }}
        animate={{
          scale: pressed ? 0.75 : hovering ? 1.8 : 1,
          opacity: hovering ? 0.9 : 0.55,
          borderColor: hovering ? 'rgba(138,111,232,0.95)' : 'rgba(138,111,232,0.55)',
        }}
        transition={{ duration: 0.18 }}
      />
    </>
  )
}