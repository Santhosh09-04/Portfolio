import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from './ui/Icon.jsx'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    toggleVisibility()
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 16 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Scroll back to top"
          title="Back to top"
          className="group fixed bottom-5 right-5 z-[85] flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/25 dark:border-white/15 bg-white/25 dark:bg-white/10 backdrop-blur-lg text-ink-soft/80 dark:text-white/70 shadow-[0_0_16px_rgba(138,111,232,0.16),0_4px_14px_-8px_rgba(122,96,205,0.28)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:bg-white/40 dark:hover:bg-white/15 hover:text-ac-lav dark:hover:text-ac-sky hover:border-ac-lav/45 dark:hover:border-ac-sky/40 hover:shadow-[0_0_26px_rgba(138,111,232,0.35),0_6px_18px_-8px_rgba(122,96,205,0.4)] focus-ring cursor-pointer"
        >
          <Icon name="arrowUp" className="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
