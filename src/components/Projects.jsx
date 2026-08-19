import { projects } from '../data/profile.js'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import TiltCard from './ui/TiltCard.jsx'
import Icon from './ui/Icon.jsx'

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 w-full max-w-full overflow-hidden">
        <div className="absolute right-1/4 top-10 h-96 w-96 rounded-full bg-mist/70 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 h-72 w-72 rounded-full bg-lilac/60 blur-3xl" />
      </div>

      <div className="section-shell">
        <SectionHeading
          kicker="Selected Work"
          icon="code"
          title={
            <>
              Projects I've <span className="text-gradient">Built</span>
            </>
          }
          subtitle="Practical builds that span enterprise tooling, voice AI, and business intelligence."
        />

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, i) => {
            const card = (
              <>
                <div className={`relative h-40 overflow-hidden bg-gradient-to-br ${project.accent}`}>
                  <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-25" />
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-white/25 blur-xl"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -left-6 -top-8 h-24 w-24 rounded-full bg-white/20 blur-md"
                  />
                  <Icon
                    name="sparkles"
                    className="absolute inset-x-0 bottom-4 mx-auto h-9 w-9 text-white/80 drop-shadow"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )

            const classes = `glass flex h-full flex-col overflow-hidden rounded-[1.75rem] shadow-soft [transform:translateZ(24px)] ${
              project.link
                ? 'cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-glass'
                : 'transition-shadow duration-300 hover:shadow-glass'
            }`

            return (
              <Reveal key={project.title} delay={i * 0.12} className="h-full">
                <TiltCard intensity={8} className="h-full">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Open ${project.title} in a new tab`}
                      className={classes}
                    >
                      {card}
                    </a>
                  ) : (
                    <article className={classes}>{card}</article>
                  )}
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}