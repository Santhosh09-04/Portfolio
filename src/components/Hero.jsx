import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Download } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile, heroSocials } from '../data/profile.js'
import Icon from './ui/Icon.jsx'
import TechFloatingBadges from './three/TechFloatingBadges.jsx'

const EASE = [0.22, 1, 0.36, 1]
gsap.registerPlugin(ScrollTrigger)

const ROLES = ['Full-Stack Developer', 'Java Developer', 'Data Analytics Enthusiast', 'UI/UX Designer']

const roleContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
}

const letterVariants = {
  initial: {
    opacity: 0,
    y: 8,
    filter: 'blur(2px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.25,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(2px)',
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
}

function AnimatedRole() {
  const reduce = useReducedMotion()
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [reduce])

  if (reduce) {
    return <span>{ROLES[0]}</span>
  }

  const currentRole = ROLES[roleIndex]

  return (
    <span className="inline-block min-w-[12.5rem] sm:min-w-[15.5rem]">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentRole}
          variants={roleContainerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="inline-flex"
        >
          {currentRole.split('').map((char, index) => (
            <motion.span
              key={`${currentRole}-${index}-${char}`}
              variants={letterVariants}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function FadeUp({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function HeroBackground() {
  const [bgSrc, setBgSrc] = useState('/hero-bg.jpg')
  const [hasError, setHasError] = useState(false)

  const handleImageError = () => {
    if (bgSrc === '/hero-bg.jpg') {
      setBgSrc('/hero-bg.png')
    } else if (bgSrc === '/hero-bg.png') {
      setBgSrc('/hero-bg.webp')
    } else if (bgSrc === '/hero-bg.webp') {
      setBgSrc('/hero-bg.jpeg')
    } else {
      setHasError(true)
    }
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-20 h-full w-full overflow-hidden select-none"
    >
      {/* Background image layer */}
      {!hasError && (
        <img
          src={bgSrc}
          onError={handleImageError}
          alt=""
          className="h-full w-full object-cover object-center opacity-15 transition-opacity duration-500 dark:opacity-20 dark:brightness-90 dark:contrast-105"
        />
      )}

      {/* Soft atmospheric overlay gradient (adapts automatically to light & dark mode) */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/40 via-cream/70 to-cream dark:from-cream/60 dark:via-cream/80 dark:to-cream" />
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()

  // GSAP scroll-triggered parallax on the soft wash blobs
  useEffect(() => {
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-wash]').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -14 },
          {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [reduce])

  const socialIcons = { linkedin: 'linkedin', github: 'github', mail: 'mail', phone: 'phone' }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full max-w-full flex-col items-center overflow-x-hidden pb-16 pt-24 sm:pb-20 sm:pt-28 lg:flex-row lg:pb-24"
    >
      {/* Hero background image layer (lowest z-index) */}
      <HeroBackground />

      {/* soft color washes (gsap parallax targets) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 w-full max-w-full overflow-hidden">
        <div data-wash className="absolute left-0 top-10 h-80 w-80 rounded-full bg-lilac/70 blur-3xl" />
        <div data-wash className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-blush/70 blur-3xl" />
        <div data-wash className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-mist/70 blur-3xl" />
      </div>

      {/* dot grid finishing into the centerpiece */}
      <div
        aria-hidden="true"
        className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(75%_70%_at_60%_40%,black,transparent)]"
      />

      {/* section-wide floating tech logo badges */}
      <TechFloatingBadges />

      {/* self-contained profile photo block — merged into top right on mobile/tablet, exact desktop side-by-side on desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-20 z-0 flex h-40 w-40 items-center justify-center sm:right-6 sm:top-24 sm:h-56 sm:w-56 md:right-10 md:top-24 md:h-64 md:w-64 lg:order-none lg:absolute lg:inset-y-0 lg:left-auto lg:right-0 lg:top-0 lg:mt-0 lg:h-auto lg:w-[52%] lg:z-10"
      >
        <div className="relative flex h-full w-full items-center justify-center">
          {/* soft glow blob & floating profile photo grid container */}
          <div className="absolute inset-0 grid place-items-center">
            <div
              aria-hidden="true"
              className="col-start-1 row-start-1 h-40 w-40 rounded-full bg-gradient-to-tr from-ac-sky/60 via-ac-lav/50 to-ac-peach/50 blur-2xl sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-[28rem] lg:w-[28rem]"
            />

            {/* floating profile photo — uncropped circular photo */}
            <motion.img
              src={profile.photoPath}
              alt={profile.name}
              className="col-start-1 row-start-1 h-36 w-36 rounded-full border-4 border-white/60 object-cover object-top shadow-2xl sm:h-52 sm:w-52 md:h-60 md:w-60 lg:h-96 lg:w-96"
              animate={reduce ? false : { y: [0, -10, 0] }}
              transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
            />
          </div>
        </div>
      </div>

      {/* content */}
      <div className="section-shell relative z-10 lg:order-none">
        <div className="w-full max-w-full break-words md:max-w-2xl lg:max-w-[46rem]">
          <FadeUp delay={0.1}>
            <span className="chip max-w-[calc(100%-145px)] sm:max-w-none">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ac-lav/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ac-lav" />
              </span>
              <span className="truncate sm:whitespace-normal">Open to internships &amp; collaboration</span>
            </span>
          </FadeUp>

          <FadeUp delay={0.22}>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink break-words xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem]">
              {profile.firstName}
              <br />
              <span className="text-gradient">{profile.name.replace(`${profile.firstName} `, '')}</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.34}>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-base font-semibold text-ink-soft sm:text-xl">
              <AnimatedRole />
              <span className="hidden h-1.5 w-1.5 rounded-full bg-ac-peach sm:inline-block" />
              <span className="font-normal text-muted">{profile.roleSecondary}</span>
            </p>
          </FadeUp>

          <FadeUp delay={0.46}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.tagline}
            </p>
          </FadeUp>

          <FadeUp delay={0.58}>
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <a href="#projects" className="btn-primary focus-ring">
                View Projects
                <Icon name="arrowRight" className="h-4 w-4" />
              </a>
              <a href={profile.resumePath} download className="btn-ghost focus-ring">
                <Download className="h-4 w-4 text-ac-lav" />
                Download Resume
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.7}>
            <div className="mt-8 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Find me on</span>
              <span className="h-px w-8 bg-hairline" />
            </div>
            <div className="mt-3 flex items-center gap-3">
              {heroSocials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  aria-label={s.aria}
                  title={s.label}
                  className="icon-btn focus-ring"
                >
                  <Icon name={socialIcons[s.icon]} className="h-[1.15rem] w-[1.15rem]" />
                </a>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>

      {/* scroll cue */}
      <FadeUp delay={1}>
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-muted transition-colors hover:text-ac-lav"
        >
          <span className="flex h-11 w-7 items-start justify-center rounded-full border-2 border-current p-1.5">
            <motion.span
              className="h-2 w-1 rounded-full bg-current"
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </a>
      </FadeUp>
    </section>
  )
}