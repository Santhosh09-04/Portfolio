import { motion } from 'framer-motion'
import { certificates } from '../data/profile.js'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'

const EASE = [0.22, 1, 0.36, 1]

export default function Certificates() {
  return (
    <section id="certificates" className="relative py-24 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          kicker="Credentials"
          icon="award"
          title={
            <>
              Certificates &amp; <span className="text-gradient">Achievements</span>
            </>
          }
          subtitle="Focused training completed through internships and structured programs."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {certificates.map((cert, i) => {
            const link = cert.href || cert.link
            const MotionTag = link ? motion.a : motion.div

            return (
              <Reveal key={cert.title} delay={i * 0.1}>
                <MotionTag
                  href={link}
                  target={link ? '_blank' : undefined}
                  rel={link ? 'noopener noreferrer' : undefined}
                  aria-label={link ? `View ${cert.title} certificate in new tab` : undefined}
                  whileHover={{ y: -8, rotate: [0, -1.2, 1.2, 0] }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className={`glass group relative flex flex-col overflow-hidden rounded-[1.5rem] p-6 text-center shadow-soft hover:shadow-glass ${
                    link ? 'cursor-pointer' : ''
                  }`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-8 top-6 h-20 rounded-full bg-lilac/60 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  {link && (
                    <div
                      aria-hidden="true"
                      className="absolute right-4 top-4 rounded-full p-1 text-muted transition-all duration-200 group-hover:bg-white/60 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <Icon name="arrowUpRight" className="h-4 w-4" />
                    </div>
                  )}

                  <motion.span
                    initial={{ opacity: 0, scale: 0.6, y: 14 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: 0.08 * i + 0.1, type: 'spring', stiffness: 200, damping: 16 }}
                    className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${cert.tint} shadow-soft`}
                  >
                    <Icon name={cert.icon} className="h-7 w-7" />
                  </motion.span>

                  <h3 className="relative mt-5 font-display text-base font-semibold leading-snug text-ink">
                    {cert.title}
                  </h3>

                  <p className="relative mt-1.5 text-xs font-medium text-muted">
                    Internship certificate
                  </p>

                  {link && (
                    <span className="relative mt-3 inline-flex items-center justify-center text-[11px] font-semibold text-ac-lav opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      View Credential &rarr;
                    </span>
                  )}
                </MotionTag>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}