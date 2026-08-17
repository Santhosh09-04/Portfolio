import { education } from '../data/profile.js'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-28">
      {/* backdrop tint */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-0 top-24 h-80 w-80 rounded-full bg-lilac/60 blur-3xl" />
      </div>

      <div className="section-shell">
        <SectionHeading
          kicker="My Journey"
          icon="graduationCap"
          title={
            <>
              Education <span className="text-gradient">Timeline</span>
            </>
          }
          subtitle="The academic milestones that shaped my engineering mindset."
        />

        <div className="relative mx-auto max-w-3xl">
          {/* spine */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-5 top-2 w-px -translate-x-1/2 bg-gradient-to-b from-ac-lav/60 via-ac-peach/50 to-transparent md:left-1/2"
          />

          <ol className="space-y-12 md:space-y-16">
            {education.map((item, i) => {
              const flip = i % 2 === 1
              return (
                <li key={item.degree} className="relative md:flex">
                  {/* node */}
                  <Reveal className="absolute left-5 z-10 -translate-x-1/2 md:left-1/2" y={0}>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white bg-white/85 shadow-soft backdrop-blur">
                      <Icon name={item.icon} className="h-5 w-5 text-ac-lav" />
                    </span>
                  </Reveal>

                  <Reveal
                    delay={0.08 * i}
                    className={`ml-16 md:ml-0 md:w-1/2 ${flip ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'}`}
                  >
                    <div className="glass rounded-2xl p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glass">
                      <span className="inline-block rounded-full bg-lilac/80 px-3 py-1 text-xs font-semibold text-ac-lav">
                        {item.period}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-semibold text-ink sm:text-xl">
                        {item.degree}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-ink-soft">{item.school}</p>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.detail}</p>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}