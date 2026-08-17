# Santhosh S V — Portfolio

A fully responsive, light-themed, 3D-animated personal portfolio for a Front-End
Developer / Software Engineering student.

## ✨ Stack

- **React 19 + Vite 8**
- **Tailwind CSS v4** (design tokens via `@theme`)
- **Three.js + React Three Fiber + Drei** (floating 3D shapes, mouse & scroll parallax)
- **Framer Motion** (scroll reveals, stagger, page chrome animations)
- **GSAP + ScrollTrigger** (scroll-scrubbed parallax washes in the hero)
- **Lucide icons** (brand icons inlined — removed from lucide core)

## 🚀 Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
npm run make:resume # regenerate public/resume.pdf placeholder
```

## 🗂️ Editing content

All copy lives in **`src/data/profile.js`** — name, links, education, skills,
projects, internships, certificates, languages, interests and stats are edited
in one place. Section components under `src/components/` render from it.

## 📸 Adding your photo

Drop a JPEG/PNG named **`profile.jpg`** into `public/`. The About section will
automatically show it inside the animated circular frame (the initial ring with
"SV" initials is the clearly-marked placeholder).

## 📄 Resume

`public/resume.pdf` is a generated placeholder CV (see `scripts/make-resume.js`).
Replace it with your real resume at the same path whenever you're ready.

## 🎨 Design tokens

- Base background: `#F7F5F2` (cream), section tints `#F2EFFB` / `#FBEFEA`
- Accents: soft blue `#5B82E6` → lavender `#8A6FE8` → peach `#E8877A`
- Typography: **Space Grotesk** (display) + **Inter** (body) via Google Fonts
- Glassmorphism cards, dot grid, film-grain overlay, custom cursor

## ♿ Accessibility & performance

- Respects `prefers-reduced-motion` (animations/parallax disabled)
- High-contrast ink-on-cream text, visible focus rings, ARIA labels
- 3D complexity is reduced on mobile (< 768px), DPR capped, `AdaptiveDpr` used
- Vendor chunks split via `manualChunks` for faster caching
