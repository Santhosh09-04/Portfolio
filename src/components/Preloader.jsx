import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

export default function Preloader() {
  const [done, setDone] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 1250)
    const t2 = setTimeout(() => setGone(true), 1700)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflowY = done ? '' : 'hidden'
    return () => {
      document.body.style.overflowY = ''
    }
  }, [done])

  return (
    <AnimatePresence>
      {!gone ? (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-7 bg-cream"
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: EASE }}
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative flex h-24 w-24 items-center justify-center"
          >
            <span className="absolute inset-0 rounded-full border border-ac-lav/30 animate-ring-pulse" />
            <span className="absolute inset-2 rounded-full border border-dashed border-ac-peach/50 animate-spin-slow" />
            <span className="font-display text-4xl font-bold text-gradient">SV</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
            className="text-sm font-medium tracking-[0.18em] text-muted uppercase"
          >
            Santhosh S V
          </motion.p>

          <div className="h-[3px] w-44 overflow-hidden rounded-full bg-hairline">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-ac-blue via-ac-lav to-ac-peach"
              initial={{ width: '4%' }}
              animate={{ width: done ? '100%' : '78%' }}
              transition={{ duration: 1.15, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}