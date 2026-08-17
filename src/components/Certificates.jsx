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

        <div className="grid grid-cols-2 gap-5 sm:gap-6 lg:grid-cols-4">
          {certificates.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, rotate: [0, -1.2, 1.2, 0] }}
                transition={{ duration: 0.45, ease: EASE }}
                className="glass group relative overflow-hidden rounded-[1.5rem] p-6 text-center shadow-soft hover:shadow-glass"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-8 top-6 h-20 rounded-full bg-lilac/60 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
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
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}