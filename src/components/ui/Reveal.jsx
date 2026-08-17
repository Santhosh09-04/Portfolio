import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

/**
 * Wraps content in a reveal-on-scroll animation.
 * Renders children in a motion.div — pass `as` style via className only.
 */
export default function Reveal({ children, delay = 0, y = 30, once = true, className = '', blur = false }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, filter: blur && !reduce ? 'blur(6px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-64px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}