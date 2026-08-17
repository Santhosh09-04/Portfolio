import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/profile.js'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import Icon from './ui/Icon.jsx'

const inputCls =
  'w-full rounded-2xl border border-white/80 bg-white/70 px-4 py-3.5 text-[16px] text-ink shadow-soft placeholder:text-muted/70 outline-none backdrop-blur transition focus:border-ac-lav/70 focus:bg-white focus:ring-4 focus:ring-ac-lav/20 sm:text-sm'

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  function update(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    if (status === 'sending' || status === 'sent') return
    setStatus('sending')
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`)
    // Opens the visitor's mail client with a pre-filled draft
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, '_self')
    setTimeout(() => setStatus('sent'), 600)
  }

  const contactRows = [
    { icon: 'mail', label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: 'phone', label: 'Phone', value: profile.phone, href: profile.phoneHref },
    { icon: 'mapPin', label: 'Location', value: profile.location, href: null },
  ]

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-lilac/70 blur-3xl" />
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-blush/70 blur-3xl" />
      </div>

      <div className="section-shell">
        <SectionHeading
          kicker="Let's Talk"
          icon="send"
          title={
            <>
              Get in <span className="text-gradient">Touch</span>
            </>
          }
          subtitle="Have a project, internship, or just want to say hi? My inbox is always open."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* contact details */}
          <div className="space-y-4 lg:col-span-2">
            {contactRows.map((row, i) => (
              <Reveal key={row.label} delay={i * 0.08}>
                <div className="glass flex items-center gap-4 rounded-2xl p-5 shadow-soft transition hover:shadow-glass">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-lilac">
                    <Icon name={row.icon} className="h-5 w-5 text-ac-lav" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {row.label}
                    </p>
                    {row.href ? (
                      <a
                        href={row.href}
                        className="mt-0.5 block truncate font-medium text-ink transition-colors hover:text-ac-lav"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-medium text-ink">{row.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary focus-ring w-full"
              >
                <Icon name="linkedin" className="h-4 w-4" />
                Connect on LinkedIn
              </a>
            </Reveal>
          </div>
{/* form */}
          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="glass relative overflow-hidden rounded-[1.75rem] p-7 shadow-glass sm:p-9">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-ac-lav/25 to-ac-peach/25 blur-2xl"
              />
              <form onSubmit={onSubmit} className="relative space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-ink-soft">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your name"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-ink-soft">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@example.com"
                      className={inputCls}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-ink-soft">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell me about your project or opportunity…"
                    className={`${inputCls} resize-none`}
                  />
                </div>

                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary focus-ring w-full disabled:opacity-70 sm:w-auto"
                  >
                    <Icon name="send" className="h-4 w-4" />
                    {status === 'sending' ? 'Opening…' : 'Send Message'}
                  </button>
                  <p className="flex items-center gap-1.5 text-xs text-muted">
                    <Icon name="sparkles" className="h-3.5 w-3.5 text-ac-lav" />
                    Opens your email app with a ready-to-send draft.
                  </p>
                </div>

                <AnimatePresence>
                  {status === 'sent' ? (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5 rounded-2xl bg-lilac/70 px-4 py-3 text-sm font-medium text-ac-lav"
                    >
                      <Icon name="check" className="h-5 w-5" />
                      Thanks {form.name || 'there'}! Your draft is ready in your email client.
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}