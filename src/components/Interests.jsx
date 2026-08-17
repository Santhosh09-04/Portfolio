import { interests } from '../data/profile.js'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'

export default function Interests() {
  return (
    <section id="interests" className="relative py-24 sm:py-28">
      <div className="section-shell">
        <SectionHeading
          kicker="Beyond Code"
          icon="heart"
          title={
            <>
              Areas of <span className="text-gradient">Interest</span>
            </>
          }
          subtitle="Where my curiosity keeps pulling me next."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {interests.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1} className="h-full">
              <div className="glass group flex h-full flex-col items-center rounded-[1.75rem] p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glass">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-lilac via-mist to-blush shadow-soft transition-transform duration-300 group-hover:scale-110">
                  <Icon name={item.icon} className="h-6 w-6 text-ac-lav" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}