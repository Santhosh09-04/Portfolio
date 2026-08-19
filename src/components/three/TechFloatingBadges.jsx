import { useEffect, useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  SiReact,
  SiMongodb,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiC,
  SiFlutter,
} from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const BADGES = [
  // --- 12 FULLY DISTRIBUTED BADGES ACROSS MOBILE & DESKTOP ---

  // 1. React (LARGE ~48px mobile, 80px desktop)
  {
    name: 'React',
    brandColor: '#61DAFB',
    glowColor: 'rgba(97, 218, 251, 0.45)',
    sizeCategory: 'large',
    badgeSizeClass: 'h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20',
    iconSizeClass: 'h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10',
    position: 'top-[3%] left-2 sm:left-3 md:left-4 lg:top-[12%] lg:left-[6%]',
    floatDuration: 4.6,
    delay: 0,
    parallax: 0.85,
    rotX: 60,
    rotY: 360,
    rotZ: 90,
    mobileShow: true,
    icon: <SiReact className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10" style={{ color: '#61DAFB' }} />,
  },

  // 2. Java (LARGE ~48px mobile, 80px desktop)
  {
    name: 'Java',
    brandColor: '#ED8B00',
    glowColor: 'rgba(237, 139, 0, 0.45)',
    sizeCategory: 'large',
    badgeSizeClass: 'h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20',
    iconSizeClass: 'h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10',
    position: 'top-[3%] right-2 sm:right-3 md:right-4 lg:top-[10%] lg:right-[6%]',
    floatDuration: 5.2,
    delay: 0.4,
    parallax: 1.1,
    rotX: 180,
    rotY: -360,
    rotZ: -60,
    mobileShow: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10">
        <path fill="#ED8B00" d="M4 19c2 1.5 8 2 10.5 0 1-.5 3-2 1.5-3-.5-.5-2.5-.5-3.5 0-2 1-5 1-7.5 0-1-.5-2.5-.5-2 1 .5 1 1 1.5 1.5 2zM5.5 15.5c1.5 1 6.5 1.5 8.5 0 .8-.5 2-1.5 1-2.2-.5-.4-2-.4-3 0-1.5.7-4 .7-6 0-.8-.4-2-.4-1.5 1 .4.7.8 1 1 1.2z" />
        <path fill="#007396" d="M15 12c-1.5-1.5-3-1-3-2.5 0-2 2-2.5 2-4.5 0-1.5-1-2.5-1-2.5s.5.8.5 1.5c0 1.5-1.5 2.5-1.5 4 0 1.8 2 2.2 2 3.5 0 .7-.5 1-.5 1s.8-.3 1.5-.5z" />
      </svg>
    ),
  },

  // 3. Power BI (SMALL ~26px mobile, 48px desktop) - Floating in upper central gap near chip
  {
    name: 'Power BI',
    brandColor: '#F2C811',
    glowColor: 'rgba(242, 200, 17, 0.4)',
    sizeCategory: 'small',
    badgeSizeClass: 'h-6.5 w-6.5 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12',
    iconSizeClass: 'h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6',
    position: 'top-[10%] right-[8%] sm:right-[12%] md:left-[32%] lg:top-[10%] lg:left-[32%]',
    floatDuration: 5.1,
    delay: 0.5,
    parallax: 1.15,
    rotX: -60,
    rotY: 180,
    rotZ: 90,
    mobileShow: true,
    icon: (
      <div className="flex flex-col items-center justify-center leading-none">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6">
          <rect x="3" y="12" width="4.5" height="9" rx="1" fill="#F2C811" />
          <rect x="9.75" y="7" width="4.5" height="14" rx="1" fill="#F2C811" />
          <rect x="16.5" y="3" width="4.5" height="18" rx="1" fill="#F2C811" />
        </svg>
      </div>
    ),
  },

  // 4. Python (LARGE ~48px mobile, 80px desktop) - Left side near name heading
  {
    name: 'Python',
    brandColor: '#3776AB',
    glowColor: 'rgba(55, 118, 171, 0.45)',
    sizeCategory: 'large',
    badgeSizeClass: 'h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-20 lg:w-20',
    iconSizeClass: 'h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10',
    position: 'top-[19%] left-2 sm:left-3 md:left-4 lg:top-[48%] lg:left-[4%]',
    floatDuration: 5.8,
    delay: 0.8,
    parallax: 0.9,
    rotX: -120,
    rotY: 270,
    rotZ: -180,
    mobileShow: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10">
        <path fill="#3776AB" d="M11.87 2c-5.27 0-4.96 2.29-4.96 2.29l.01 2.38h5.05v.72H4.96S2.67 7.08 2.67 12.35c0 5.27 2.05 5.08 2.05 5.08h1.23v-1.74s-.07-2.05 2.05-2.05h5.01s1.97.03 1.97-1.92V6.96S15.35 2 11.87 2zm-2.01 1.56a.91.91 0 1 1 0 1.82.91.91 0 0 1 0-1.82z" />
        <path fill="#FFD43B" d="M12.13 22c5.27 0 4.96-2.29 4.96-2.29l-.01-2.38h-5.05v-.72h7.01s2.29.31 2.29-4.96c0-5.27-2.05-5.08-2.05-5.08h-1.23v1.74s.07 2.05-2.05 2.05h-5.01s-1.97-.03-1.97 1.92v4.75S8.65 22 12.13 22zm2.01-1.56a.91.91 0 1 1 0-1.82a.91.91 0 0 1 0 1.82z" />
      </svg>
    ),
  },

  // 5. Node.js (MEDIUM ~38px mobile, 64px desktop) - Right side gap near role/tagline text
  {
    name: 'Node.js',
    brandColor: '#5FA04E',
    glowColor: 'rgba(95, 160, 78, 0.4)',
    sizeCategory: 'medium',
    badgeSizeClass: 'h-9.5 w-9.5 sm:h-11 sm:w-11 md:h-13 md:w-13 lg:h-16 lg:w-16',
    iconSizeClass: 'h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8',
    position: 'top-[30%] right-2 sm:right-3 md:right-4 lg:top-[72%] lg:left-[3%] lg:right-auto',
    floatDuration: 4.8,
    delay: 0.3,
    parallax: 1.2,
    rotX: 90,
    rotY: 240,
    rotZ: 120,
    mobileShow: true,
    icon: <SiNodedotjs className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" style={{ color: '#5FA04E' }} />,
  },

  // 6. MongoDB (MEDIUM ~38px mobile, 64px desktop) - Left-central open gap between tagline & CTA buttons
  {
    name: 'MongoDB',
    brandColor: '#47A248',
    glowColor: 'rgba(71, 162, 72, 0.4)',
    sizeCategory: 'medium',
    badgeSizeClass: 'h-9.5 w-9.5 sm:h-11 sm:w-11 md:h-13 md:w-13 lg:h-16 lg:w-16',
    iconSizeClass: 'h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8',
    position: 'top-[42%] left-3 sm:left-4 md:left-4 lg:top-[46%] lg:right-[5%] lg:left-auto',
    floatDuration: 5.4,
    delay: 1.1,
    parallax: 0.85,
    rotX: -180,
    rotY: -270,
    rotZ: 60,
    mobileShow: true,
    icon: <SiMongodb className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" style={{ color: '#47A248' }} />,
  },

  // 7. MySQL (SMALL ~26px mobile, 48px desktop) - Right side gap near social links
  {
    name: 'MySQL',
    brandColor: '#4479A1',
    glowColor: 'rgba(68, 121, 161, 0.4)',
    sizeCategory: 'small',
    badgeSizeClass: 'h-6.5 w-6.5 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12',
    iconSizeClass: 'h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6',
    position: 'top-[55%] right-3 sm:right-4 md:right-4 lg:top-auto lg:right-auto lg:bottom-[10%] lg:left-[54%]',
    floatDuration: 4.9,
    delay: 0.6,
    parallax: 1.0,
    rotX: 180,
    rotY: -180,
    rotZ: 120,
    mobileShow: true,
    icon: <SiMysql className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6" style={{ color: '#4479A1' }} />,
  },

  // 8. Flutter (MEDIUM ~38px mobile, 64px desktop) - Upper-left of profile photo ring
  {
    name: 'Flutter',
    brandColor: '#02569B',
    glowColor: 'rgba(2, 86, 155, 0.4)',
    sizeCategory: 'medium',
    badgeSizeClass: 'h-9.5 w-9.5 sm:h-11 sm:w-11 md:h-13 md:w-13 lg:h-16 lg:w-16',
    iconSizeClass: 'h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8',
    position: 'top-[68%] left-[8%] sm:left-[10%] md:left-[46%] lg:top-[22%] lg:left-[46%]',
    floatDuration: 5.0,
    delay: 0.6,
    parallax: 1.05,
    rotX: -90,
    rotY: 270,
    rotZ: -120,
    mobileShow: true,
    icon: <SiFlutter className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" style={{ color: '#02569B' }} />,
  },

  // 9. C (SMALL ~26px mobile, 48px desktop) - Upper-right of profile photo ring
  {
    name: 'C',
    brandColor: '#A8B9CC',
    glowColor: 'rgba(168, 185, 204, 0.4)',
    sizeCategory: 'small',
    badgeSizeClass: 'h-6.5 w-6.5 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12',
    iconSizeClass: 'h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6',
    position: 'top-[74%] right-[8%] sm:right-[10%] md:left-[48%] lg:top-[44%] lg:left-[48%]',
    floatDuration: 4.7,
    delay: 0.9,
    parallax: 1.05,
    rotX: -120,
    rotY: 240,
    rotZ: -60,
    mobileShow: true,
    icon: <SiC className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6" style={{ color: '#A8B9CC' }} />,
  },

  // 10. PostgreSQL (MEDIUM ~38px mobile, 64px desktop) - Lower-right of profile photo
  {
    name: 'PostgreSQL',
    brandColor: '#4169E1',
    glowColor: 'rgba(65, 105, 225, 0.4)',
    sizeCategory: 'medium',
    badgeSizeClass: 'h-9.5 w-9.5 sm:h-11 sm:w-11 md:h-13 md:w-13 lg:h-16 lg:w-16',
    iconSizeClass: 'h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8',
    position: 'top-[84%] right-[6%] sm:right-[8%] md:right-[6%] lg:bottom-[14%] lg:right-[7%]',
    floatDuration: 5.5,
    delay: 0.2,
    parallax: 0.9,
    rotX: 120,
    rotY: 300,
    rotZ: -90,
    mobileShow: true,
    icon: <SiPostgresql className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" style={{ color: '#4169E1' }} />,
  },

  // 11. Adobe (SMALL ~26px mobile, 48px desktop) - Lower-left of profile photo
  {
    name: 'Adobe',
    brandColor: '#FF0000',
    glowColor: 'rgba(255, 0, 0, 0.4)',
    sizeCategory: 'small',
    badgeSizeClass: 'h-6.5 w-6.5 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12',
    iconSizeClass: 'h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6',
    position: 'top-[88%] left-[6%] sm:left-[8%] md:left-[42%] lg:top-[68%] lg:left-[42%]',
    floatDuration: 5.6,
    delay: 0.7,
    parallax: 1.15,
    rotX: 210,
    rotY: -180,
    rotZ: -120,
    mobileShow: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 md:h-5.5 md:w-5.5 lg:h-6 lg:w-6">
        <path fill="#FF0000" d="M13.966 22h6.034L12 2h-6.034L10.034 22zM10.034 22H4L12 2h6.034L10.034 22zM14.4 15.6H9.6l2.4-5.8 2.4 5.8z" />
      </svg>
    ),
  },

  // 12. Canva (MEDIUM ~38px mobile, 64px desktop) - Profile photo bottom right / scroll cue
  {
    name: 'Canva',
    brandColor: '#00C4CC',
    glowColor: 'rgba(0, 196, 204, 0.45)',
    sizeCategory: 'medium',
    badgeSizeClass: 'h-9.5 w-9.5 sm:h-11 sm:w-11 md:h-13 md:w-13 lg:h-16 lg:w-16',
    iconSizeClass: 'h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8',
    position: 'top-[93%] right-[14%] sm:right-[16%] md:right-[14%] lg:bottom-[22%] lg:right-[14%]',
    floatDuration: 5.3,
    delay: 0.9,
    parallax: 1.1,
    rotX: 150,
    rotY: -240,
    rotZ: 180,
    mobileShow: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8">
        <defs>
          <linearGradient id="canvaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C4CC" />
            <stop offset="100%" stopColor="#7D2AE8" />
          </linearGradient>
        </defs>
        <path fill="url(#canvaGrad)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 13.5c-1.2 1.2-2.8 1.8-4.5 1.8-3.3 0-5.8-2.2-5.8-5.5 0-3.6 2.8-6.1 6.5-6.1 1.6 0 2.9.5 3.8 1.4l-1.2 1.4c-.7-.7-1.6-1-2.6-1-2.4 0-4.2 1.6-4.2 4.2 0 2.2 1.5 3.7 3.8 3.7 1.1 0 2.1-.4 2.9-1.1l1.3 1.2z" />
      </svg>
    ),
  },
]

export default function TechFloatingBadges() {
  const containerRef = useRef(null)
  const reduce = useReducedMotion()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Mouse Parallax Effect
  useEffect(() => {
    if (reduce) return
    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [reduce])

  // GSAP ScrollTrigger Progressive 3D Rotation
  useEffect(() => {
    if (reduce) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-badge-scroll]').forEach((el) => {
        const rotX = parseFloat(el.getAttribute('data-rot-x') || 0)
        const rotY = parseFloat(el.getAttribute('data-rot-y') || 0)
        const rotZ = parseFloat(el.getAttribute('data-rot-z') || 0)

        gsap.to(el, {
          rotateX: rotX,
          rotateY: rotY,
          rotateZ: rotZ,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current || '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [reduce])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden [perspective:1000px]"
    >
      {/* Floating Glass Badges with background z-0 layering & varied responsive sizes */}
      {BADGES.map((badge) => {
        const parallaxX = reduce ? 0 : mousePos.x * badge.parallax * 12
        const parallaxY = reduce ? 0 : mousePos.y * badge.parallax * 12

        return (
          <motion.div
            key={badge.name}
            className={`absolute ${badge.position} ${badge.mobileShow ? 'flex' : 'hidden lg:flex'}`}
            animate={
              reduce
                ? false
                : {
                    y: [0, -10, 0],
                    x: [0, 5, 0],
                  }
            }
            transition={{
              duration: badge.floatDuration,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: badge.delay,
            }}
            style={{
              translateX: parallaxX,
              translateY: parallaxY,
            }}
          >
            {/* Inner GSAP Scroll-Rotation wrapper */}
            <div
              data-badge-scroll
              data-rot-x={badge.rotX}
              data-rot-y={badge.rotY}
              data-rot-z={badge.rotZ}
              className="[transform-style:preserve-3d] will-change-transform"
            >
              <div
                title={badge.name}
                className={`flex ${badge.badgeSizeClass} items-center justify-center rounded-full border border-white/60 dark:border-white/15 bg-white/75 dark:bg-slate-900/85 backdrop-blur-md transition-transform duration-300 hover:scale-110 shadow-xl`}
                style={{
                  boxShadow: `0 8px 24px -4px ${badge.glowColor}, 0 4px 12px rgba(0, 0, 0, 0.08)`,
                }}
              >
                {badge.icon}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
