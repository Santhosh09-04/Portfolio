import { motion } from 'framer-motion'
import { skillGroups } from '../data/profile.js'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'

const EASE = [0.22, 1, 0.36, 1]

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-1/2 h-80 w-80 rounded-full bg-blush/60 blur-3xl" />
      </div>

      <div className="section-shell">
        <SectionHeading
          kicker="What I Bring"
          icon="sparkles"
          title={
            <>
              Skills &amp; <span className="text-gradient">Toolbox</span>
            </>
          }
          subtitle="A growing toolkit across programming, data, and design — every project teaches me something new."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 0.12} className="h-full">
              <div className="glass group relative h-full overflow-hidden rounded-[1.75rem] p-7 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glass">
                {/* accent blob */}
                <div
                  aria-hidden="true"
                  className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${group.tint} opacity-60 blur-2xl transition-transform duration-500 group-hover:scale-125`}
                />
                <div className="relative">
                  <span
                    className={`flex h-13 w-13 items-center justify-center rounded-2xl ${group.tint} shadow-soft`}
                  >
                    <Icon name={group.icon} className="h-6 w-6 text-ac-lav" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">{group.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{group.blurb}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ delay: 0.05 * si, duration: 0.4, ease: EASE }}
                        whileHover={{ y: -3, scale: 1.05 }}
                        className="chip"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}