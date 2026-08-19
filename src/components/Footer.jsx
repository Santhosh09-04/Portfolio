import { navLinks, profile, heroSocials } from '../data/profile.js'
import Icon from './ui/Icon.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  const icons = { linkedin: 'linkedin', github: 'github', mail: 'mail', phone: 'phone' }

  return (
    <footer className="relative border-t border-hairline dark:border-white/10 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md">
      <div className="section-shell py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center gap-2.5 md:justify-start">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-ac-blue to-ac-lav font-display text-sm font-bold text-white shadow-soft">
                S
              </span>
              <span className="font-display text-lg font-semibold text-ink">
                Santhosh <span className="text-ac-lav">S&nbsp;V</span>
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {profile.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-2 text-center sm:grid-cols-3 md:text-left">
            {navLinks.slice(0, 6).map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ac-lav dark:hover:text-ac-sky"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {heroSocials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                aria-label={s.aria}
                title={s.label}
                className="icon-btn focus-ring"
              >
                <Icon name={icons[s.icon]} className="h-[1.05rem] w-[1.05rem]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-hairline dark:border-white/10 pt-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {year} Santhosh S V. Crafted with care.</p>
          <p className="flex items-center gap-1.5">
            Built with React · Three.js · Tailwind
            <span className="text-ac-peach">·</span>
            <Icon name="heart" className="h-3.5 w-3.5 text-ac-peach" />
          </p>
        </div>
      </div>
    </footer>
  )
}