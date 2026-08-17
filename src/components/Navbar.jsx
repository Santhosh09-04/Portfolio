import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, profile } from '../data/profile.js'
import Icon from './ui/Icon.jsx'

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Navbar() {
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
    // let the mobile menu close before scrolling
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full py-2.5 pl-3 pr-3 transition-all duration-300 ${
          scrolled ? 'glass-strong shadow-glass' : 'glass'
        }`}
        aria-label="Primary"
      >
        <button
          onClick={() => go('about')}
          className="focus-ring flex items-center gap-2.5 rounded-full"
          aria-label="Back to top"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-ac-blue to-ac-lav font-display text-sm font-bold text-white shadow-soft">
            S
          </span>
          <span className="hidden font-display font-semibold tracking-tight text-ink sm:block">
            Santhosh <span className="text-ac-lav">S&nbsp;V</span>
          </span>
        </button>

        <div className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`focus-ring relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                active === l.id ? 'text-ac-lav' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {active === l.id ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-lilac"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              ) : null}
              <span className="relative">{l.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={profile.resumePath}
            download
            className="btn-primary focus-ring hidden !rounded-full sm:inline-flex"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.875rem' }}
          >
            <Icon name="download" className="h-4 w-4" />
            Resume
          </a>
          <button
            className="icon-btn focus-ring lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" />
          </button>
        </div>
      </nav>

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
              className="absolute inset-0 bg-mist/70 backdrop-blur-xl"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              className="glass-strong absolute inset-x-4 top-4 rounded-3xl p-6 shadow-glass"
              initial={{ y: -24, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -16, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-base font-bold text-ink">Menu</span>
                <button className="icon-btn focus-ring" onClick={() => setOpen(false)} aria-label="Close menu">
                  <Icon name="x" />
                </button>
              </div>
              <ul className="mt-5 flex flex-col gap-1">
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
                          ? 'bg-lilac text-ac-lav'
                          : 'text-ink-soft hover:bg-lilac/60 hover:text-ink'
                      }`}
                    >
                      {l.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
              <a href={profile.resumePath} download className="btn-primary focus-ring mt-5 w-full">
                <Icon name="download" className="h-4 w-4" />
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}