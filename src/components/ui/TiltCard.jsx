import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Pointer-following 3D tilt plus a moving glare highlight.
 * Tilt only activates on fine pointers (touch devices get a static card).
 */
export default function TiltCard({ children, className = '', intensity = 9, glare = true }) {
  const ref = useRef(null)
  const [enabled, setEnabled] = useState(false)

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)

  const srx = useSpring(rx, { stiffness: 180, damping: 18 })
  const sry = useSpring(ry, { stiffness: 180, damping: 18 })
  const glareBg = useTransform(
    [gx, gy],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x}% ${y}%, rgba(255,255,255,0.75), rgba(255,255,255,0.02) 62%)`,
  )

  function onMove(e) {
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * intensity)
    rx.set(py * -intensity)
    gx.set((px + 0.5) * 100)
    gy.set((py + 0.5) * 100)
  }

  function onLeave() {
    rx.set(0)
    ry.set(0)
    gx.set(50)
    gy.set(50)
  }

  return (
    <div className={`[perspective:1200px] ${className}`}>
      <motion.div
        ref={(node) => {
          ref.current = node
          if (node && typeof window !== 'undefined') {
            setEnabled(window.matchMedia('(pointer: fine)').matches)
          }
        }}
        className="group relative h-full [transform-style:preserve-3d]"
        onMouseMove={enabled ? onMove : undefined}
        onMouseLeave={enabled ? onLeave : undefined}
        style={{ rotateX: srx, rotateY: sry }}
        whileHover={enabled ? { scale: 1.015 } : undefined}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
        {glare && enabled ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: glareBg }}
          />
        ) : null}
      </motion.div>
    </div>
  )
}