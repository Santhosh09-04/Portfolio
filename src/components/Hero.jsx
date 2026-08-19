import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Download } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile, heroSocials } from '../data/profile.js'
import Icon from './ui/Icon.jsx'
import HeroScene from './three/HeroScene.jsx'
import TechFloatingBadges from './three/TechFloatingBadges.jsx'

const EASE = [0.22, 1, 0.36, 1]
gsap.registerPlugin(ScrollTrigger)

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
      className="relative flex min-h-[100svh] w-full max-w-full flex-col items-center overflow-x-hidden pb-24 pt-32 sm:pt-28 md:flex-row"
    >
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

      {/* profile photo container */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative order-2 mt-8 h-[380px] w-full max-w-full overflow-hidden sm:h-[420px] md:order-none md:absolute md:inset-y-0 md:left-auto md:right-0 md:mt-0 md:h-auto md:w-[52%] md:overflow-visible"
      >
        <div className="relative h-full w-full">
          {/* soft glow blob behind the photo */}
          <div className="absolute inset-0 grid place-items-center">
            <div
              aria-hidden="true"
              className="col-start-1 row-start-1 h-72 w-72 rounded-full bg-gradient-to-tr from-ac-sky/60 via-ac-lav/50 to-ac-peach/50 blur-3xl sm:h-96 sm:w-96 md:h-[28rem] md:w-[28rem]"
            />

            {/* floating profile photo — uses profile.photoPath from src/data/profile.js */}
            <motion.img
              src={profile.photoPath}
              alt={profile.name}
              className="col-start-1 row-start-1 h-52 w-52 rounded-full border-4 border-white/60 object-cover object-top shadow-2xl sm:h-80 sm:w-80 md:h-96 md:w-96"
              animate={reduce ? false : { y: [0, -14, 0] }}
              transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
            />
          </div>
        </div>
      </div>

      {/* content */}
      <div className="section-shell relative z-10 order-1 md:order-none">
        <div className="w-full max-w-full break-words md:max-w-2xl lg:max-w-[46rem]">
          <FadeUp delay={0.1}>
            <span className="chip max-w-[280px] sm:max-w-none">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ac-lav/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ac-lav" />
              </span>
              Open to internships &amp; collaboration
            </span>
          </FadeUp>

          <FadeUp delay={0.22}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.03] tracking-tight text-ink break-words sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem]">
              {profile.firstName}
              <br />
              <span className="text-gradient">{profile.name.replace(`${profile.firstName} `, '')}</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.34}>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-base font-semibold text-ink-soft sm:text-xl">
              {profile.role}
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
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
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
            <div className="mt-9 flex items-center gap-3">
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