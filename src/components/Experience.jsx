import { useRef } from 'react'
import { experiences } from '../data/profile.js'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'

export default function Experience() {
  const track = useRef(null)

  function scrollByCard(dir) {
    const el = track.current
    if (!el) return
    const card = el.querySelector('[data-card]')
    const amount = card ? card.clientWidth + 24 : el.clientWidth * 0.7
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <section id="experience" className="relative overflow-hidden py-24 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-mist/70 blur-3xl" />
      </div>

      <div className="section-shell">
        <SectionHeading
          kicker="Internships"
          icon="briefcase"
          title={
            <>
              Where I've <span className="text-gradient">Worked</span>
            </>
          }
          subtitle="Hands-on experience across Java, design, mobile and data roles in fast-paced teams."
        />

        <div
          ref={track}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8"
          role="region"
          aria-label="Internship experience cards"
        >
          {experiences.map((exp, i) => (
            <Reveal key={`${exp.company}-${exp.role}`} delay={0.06 * i} className="w-[86vw] shrink-0 snap-start sm:w-[420px]">
              <article
                data-card
                className="glass relative flex h-full min-h-72 flex-col rounded-[1.75rem] p-7 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glass"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 top-5 font-display text-5xl font-bold text-lilac"
                >
                  0{i + 1}
                </span>
                <div className="relative flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lilac shadow-soft">
                    <Icon name={exp.icon} className="h-5 w-5 text-ac-lav" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-lg font-semibold text-ink">{exp.role}</h3>
                    <p className="text-sm font-medium text-ink-soft">{exp.company}</p>
                  </div>
                </div>
                <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-blush/90 px-3 py-1.5 text-xs font-semibold text-ac-peach">
                  <Icon name="calendar" className="h-3.5 w-3.5" />
                  {exp.period}
                </span>
                <ul className="mt-5 space-y-2.5">
                  {exp.points.map((pt) => (
                    <li key={pt.slice(0, 20)} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-ac-lav" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-7 flex items-center justify-center gap-4">
          <button
            className="icon-btn focus-ring"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll to previous internships"
          >
            <Icon name="chevronLeft" className="h-5 w-5" />
          </button>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Swipe · Drag
          </span>
          <button
            className="icon-btn focus-ring"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll to next internships"
          >
            <Icon name="chevronRight" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}