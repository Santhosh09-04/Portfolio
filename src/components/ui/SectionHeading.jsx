import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'

export default function SectionHeading({
  kicker,
  title,
  subtitle,
  id,
  icon = 'sparkles',
}) {
  return (
    <div className="mb-12 text-center sm:mb-16">
      <Reveal>
        <span className="chip mx-auto shadow-sm">
          <Icon name={icon} className="h-4 w-4 text-ac-lav" />
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-[2.6rem] md:leading-[1.15]">
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.16}>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}