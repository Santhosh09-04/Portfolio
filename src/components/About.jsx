import { useState } from 'react'
import { profile, stats } from '../data/profile.js'
import Reveal from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'

function PhotoFrame() {
  const [err, setErr] = useState(false)

  return (
    <div className="relative mx-auto h-60 w-60 sm:h-72 sm:w-72">
      {/* breathing glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-5 animate-ring-pulse rounded-full bg-gradient-to-tr from-ac-lav/30 via-transparent to-ac-peach/30 blur-2xl"
      />
      {/* rotating conic ring */}
      <div
        aria-hidden="true"
        className="absolute inset-0 animate-spin-slow rounded-full"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(138,111,232,0.7), rgba(255,195,166,0.7), rgba(126,166,255,0.7), rgba(138,111,232,0.7))',
        }}
      />
      {/* frosted inset */}
      <div aria-hidden="true" className="absolute inset-1.5 rounded-full bg-white/75 backdrop-blur-md" />
      {/* photo / placeholder */}
      <div className="absolute inset-[1.1rem] flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-lilac via-mist to-blush shadow-inner">
        {err ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-6 text-center">
            <span className="font-display text-5xl font-bold text-gradient">SV</span>
            <span className="text-xs font-medium leading-snug text-muted">
              {profile.photoPlaceholderText}
            </span>
          </div>
        ) : (
          <img
            src={profile.photoPath}
            alt="Portrait of Santhosh S V"
            className="h-full w-full object-cover"
            onError={() => setErr(true)}
          />
        )}
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="section-shell">
        <div className="grid items-center gap-14 lg:grid-cols-5 lg:gap-10">
          {/* photo column */}
          <Reveal className="lg:col-span-2">
            <div className="relative">
              <PhotoFrame />
            </div>
          </Reveal>

          {/* text column */}
          <div className="lg:col-span-3">
            <Reveal>
              <span className="chip">
                <Icon name="user" className="h-4 w-4 text-ac-lav" />
                About Me
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Turning ideas into <span className="text-gradient">functional products</span>
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
                {profile.about.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-8 flex flex-wrap gap-2">
                <span className="chip">UI / UX</span>
                <span className="chip">Front-End</span>
                <span className="chip">Data &amp; BI</span>
                <span className="chip">Voice AI</span>
                <span className="chip">Problem Solving</span>
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map((s) => (
                  <div key={s.label} className="glass rounded-2xl px-4 py-5 text-center shadow-soft">
                    <p className="font-display text-2xl font-bold text-gradient sm:text-3xl">{s.value}</p>
                    <p className="mt-1 text-xs font-medium leading-snug text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}