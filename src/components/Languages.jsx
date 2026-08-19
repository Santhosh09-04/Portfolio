import { motion } from 'framer-motion'
import { languages } from '../data/profile.js'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'

const EASE = [0.22, 1, 0.36, 1]

export default function Languages() {
  return (
    <section id="languages" className="relative py-24 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 w-full max-w-full overflow-hidden">
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-blush/60 blur-3xl" />
      </div>

      <div className="section-shell">
        <SectionHeading
          kicker="Polyglot"
          icon="languages"
          title={
            <>
              Languages I <span className="text-gradient">Speak</span>
            </>
          }
          subtitle="From native fluency to a JLPT N5 journey — communication is a core skill."
        />

        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {languages.map((lang, i) => (
            <Reveal key={lang.name} delay={i * 0.08}>
              <div className="glass rounded-[1.5rem] p-6 shadow-soft transition hover:shadow-glass">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold text-ink">{lang.name}</h3>
                  <span className="rounded-full bg-lilac/80 dark:bg-ac-lav/20 px-3 py-1 text-xs font-semibold text-ac-lav dark:text-ac-sky">
                    {lang.level}
                  </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/80 dark:bg-slate-800/80">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-ac-blue via-ac-lav to-ac-peach"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.proficiency}%` }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 1, delay: 0.2, ease: EASE }}
                  />
                </div>
                <p className="mt-2.5 text-right text-xs font-medium text-muted">
                  {lang.proficiency}%
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}