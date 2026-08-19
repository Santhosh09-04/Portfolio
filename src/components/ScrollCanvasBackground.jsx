import { useEffect, useRef } from 'react'

const TOTAL_FRAMES = 300

function getFrameUrl(index) {
  const num = String(index + 1).padStart(3, '0')
  return `/FINAL PNG/ezgif-frame-${num}.png`
}

export default function ScrollCanvasBackground() {
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const currentFrameRef = useRef(0)
  const targetFrameRef = useRef(0)
  const animFrameIdRef = useRef(null)

  // Draw & blend adjacent PNG frames for 60fps liquid-smooth scroll interpolation
  const drawFrame = (fractionalFrame) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, fractionalFrame))
    const index1 = Math.floor(clamped)
    const index2 = Math.min(TOTAL_FRAMES - 1, Math.ceil(clamped))
    const blend = clamped - index1

    const img1 = imagesRef.current[index1]
    const img2 = imagesRef.current[index2]

    if (!img1 || !img1.complete || img1.naturalWidth === 0) return

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const w = canvas.width
    const h = canvas.height
    const iw = img1.naturalWidth
    const ih = img1.naturalHeight

    const r = Math.max(w / iw, h / ih)
    const nw = iw * r
    const nh = ih * r
    const cx = (w - nw) / 2
    const cy = (h - nh) / 2

    ctx.clearRect(0, 0, w, h)

    // Draw primary frame
    ctx.globalAlpha = 1 - blend
    ctx.drawImage(img1, cx, cy, nw, nh)

    // Cross-blend adjacent frame for ultra-smooth transition
    if (index1 !== index2 && img2 && img2.complete && img2.naturalWidth > 0) {
      ctx.globalAlpha = blend
      ctx.drawImage(img2, cx, cy, nw, nh)
    }

    ctx.globalAlpha = 1.0
  }

  // Handle canvas sizing with high DPI pixel scaling
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      drawFrame(currentFrameRef.current)
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Preload frame PNGs & run liquid-smooth scroll interpolation animation loop
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES)

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = getFrameUrl(i)
      img.onload = () => {
        imagesRef.current[i] = img
        if (i === 0) {
          drawFrame(0)
        }
      }
      imagesRef.current[i] = img
    }

    // Smooth lerp scroll render loop
    const render = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight
      if (scrollMax > 0) {
        const scrollFraction = Math.max(0, Math.min(1, window.scrollY / scrollMax))
        targetFrameRef.current = Math.min(TOTAL_FRAMES - 1, scrollFraction * (TOTAL_FRAMES - 1))
      }

      const diff = targetFrameRef.current - currentFrameRef.current
      if (Math.abs(diff) > 0.0001) {
        currentFrameRef.current += diff * 0.12
        drawFrame(currentFrameRef.current)
      }

      animFrameIdRef.current = requestAnimationFrame(render)
    }

    animFrameIdRef.current = requestAnimationFrame(render)

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current)
      }
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-30 h-full w-full overflow-hidden select-none"
    >
      {/* Canvas background layer */}
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover opacity-75 contrast-[1.05] brightness-[1.02] transition-opacity duration-500 dark:opacity-80 dark:brightness-105"
      />

      {/* Readability vignette overlay for light & dark modes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_20%,var(--color-vignette-mid)_65%,var(--color-vignette-outer)_98%)] opacity-85 transition-colors duration-500 [--color-vignette-mid:rgba(246,244,240,0.70)] [--color-vignette-outer:rgba(246,244,240,0.95)] dark:[--color-vignette-mid:rgba(15,23,42,0.75)] dark:[--color-vignette-outer:rgba(15,23,42,0.95)]" />

      {/* Subtle backdrop wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/20 via-cream/35 to-cream/60 dark:from-slate-950/25 dark:via-slate-950/40 dark:to-slate-950/70" />
    </div>
  )
}

