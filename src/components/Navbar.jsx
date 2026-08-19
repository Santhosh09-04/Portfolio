import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, profile } from '../data/profile.js'
import { useTheme } from '../hooks/useTheme.js'
import Icon from './ui/Icon.jsx'

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
  const [isDark, setIsDark] = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-42% 0px -52% 0px' },
    )
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  function go(id) {
    setOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[80] w-full max-w-full px-4 pt-3 sm:px-6 sm:pt-4">
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full py-2 px-4 sm:py-2.5 sm:px-5 transition-all duration-300 w-full overflow-hidden ${
          scrolled ? 'glass-strong shadow-glass' : 'glass'
        }`}
        aria-label="Primary"
      >
        {/* Left Brand / Logo */}
        <button
          onClick={() => go('about')}
          className="focus-ring flex items-center gap-2 rounded-full shrink-0"
          aria-label="Back to top"
        >
          <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-br from-ac-blue to-ac-lav font-display text-sm font-bold text-white shadow-soft shrink-0">
            S
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-ink sm:text-base">
            Santhosh <span className="hidden xs:inline text-ac-lav">S&nbsp;V</span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`focus-ring relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                active === l.id ? 'text-ac-lav dark:text-ac-sky font-semibold' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {active === l.id ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-lilac dark:bg-ac-lav/25"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span className="relative">{l.label}</span>
            </button>
          ))}
        </div>

        {/* Right Controls: Theme Toggle + Resume Button (Desktop/Tablet) + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 pr-1 sm:pr-0">
          <button
            onClick={() => setIsDark(!isDark)}
            className="icon-btn focus-ring !h-8 !w-8 sm:!h-9 sm:!w-9 shrink-0"
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <Icon name={isDark ? 'sun' : 'moon'} className="h-4 w-4 text-ac-lav transition-transform duration-300 hover:rotate-45" />
          </button>

          <a
            href={profile.resumePath}
            download
            className="btn-primary focus-ring hidden sm:inline-flex !rounded-full !px-3 !py-1.5 !text-xs sm:!px-4 sm:!py-2 sm:!text-sm shrink-0 items-center gap-1"
          >
            <Icon name="download" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Resume
          </a>

          <button
            className="icon-btn focus-ring !h-8 !w-8 sm:!h-9 sm:!w-9 lg:hidden shrink-0"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" className="h-4.5 w-4.5" />
          </button>
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[95] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-mist/70 dark:bg-slate-950/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="glass-strong absolute inset-x-3 top-3 rounded-3xl p-5 shadow-glass max-w-lg mx-auto"
              initial={{ y: -24, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -16, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
              <div className="flex items-center justify-between border-b border-hairline pb-3 dark:border-white/10">
                <span className="font-display text-base font-bold text-ink">Navigation</span>
                <button className="icon-btn focus-ring !h-9 !w-9" onClick={() => setOpen(false)} aria-label="Close menu">
                  <Icon name="x" className="h-4 w-4" />
                </button>
              </div>

              <ul className="mt-4 flex flex-col gap-1">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                  >
                    <button
                      onClick={() => go(l.id)}
                      className={`focus-ring w-full rounded-xl px-4 py-3 text-left text-base font-semibold transition-colors ${
                        active === l.id
                          ? 'bg-lilac dark:bg-ac-lav/30 text-ac-lav dark:text-ac-sky'
                          : 'text-ink-soft hover:bg-lilac/60 hover:text-ink'
                      }`}
                    >
                      {l.label}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-5 pt-3 border-t border-hairline dark:border-white/10 flex flex-col gap-2.5">
                <a href={profile.resumePath} download className="btn-primary focus-ring w-full justify-center text-sm py-3">
                  <Icon name="download" className="h-4 w-4" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}