import { useEffect, useRef } from 'react'

const TOTAL_FRAMES = 300

function getFrameUrl(index) {
  const num = String(index + 1).padStart(3, '0')
  return `/FINAL%20PNG/ezgif-frame-${num}.png`
}

export default function ScrollCanvasBackground() {
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const currentFrameRef = useRef(0)
  const targetFrameRef = useRef(0)
  const animFrameIdRef = useRef(null)

  // Find nearest loaded frame if target frame is still loading
  const getLoadedImage = (targetIndex) => {
    const images = imagesRef.current
    if (images[targetIndex]?.complete && images[targetIndex]?.naturalWidth > 0) {
      return images[targetIndex]
    }
    for (let i = targetIndex - 1; i >= 0; i--) {
      if (images[i]?.complete && images[i]?.naturalWidth > 0) {
        return images[i]
      }
    }
    for (let i = targetIndex + 1; i < TOTAL_FRAMES; i++) {
      if (images[i]?.complete && images[i]?.naturalWidth > 0) {
        return images[i]
      }
    }
    return null
  }

  // Draw & blend adjacent frames for high-definition 60fps liquid-smooth scroll interpolation
  const drawFrame = (fractionalFrame) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true }) || canvas.getContext('2d')
    if (!ctx) return

    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, fractionalFrame))
    const index1 = Math.floor(clamped)
    const index2 = Math.min(TOTAL_FRAMES - 1, Math.ceil(clamped))
    const blend = clamped - index1

    const img1 = getLoadedImage(index1)
    if (!img1) return

    const img2 = getLoadedImage(index2)

    // High definition context settings
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const w = canvas.width
    const h = canvas.height
    const iw = img1.naturalWidth
    const ih = img1.naturalHeight

    const r = Math.max(w / iw, h / ih)
    const nw = Math.ceil(iw * r)
    const nh = Math.ceil(ih * r)
    const cx = Math.floor((w - nw) / 2)
    const cy = Math.floor((h - nh) / 2)

    ctx.clearRect(0, 0, w, h)

    // Draw primary frame in HD
    ctx.globalAlpha = 1.0
    ctx.drawImage(img1, cx, cy, nw, nh)

    // Cross-blend adjacent frame for ultra-smooth 60fps transitions
    if (index1 !== index2 && img2 && img2 !== img1) {
      ctx.globalAlpha = blend
      ctx.drawImage(img2, cx, cy, nw, nh)
    }

    ctx.globalAlpha = 1.0
  }

  // Handle canvas sizing with high DPI Retina pixel scaling (up to 2.5x for full HD clarity)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5)
      const rect = canvas.getBoundingClientRect()
      const width = rect.width || window.innerWidth
      const height = rect.height || window.innerHeight

      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)

      drawFrame(currentFrameRef.current)
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Preload frame sequence & run liquid-smooth scroll interpolation loop
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES)

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = getFrameUrl(i)
      img.onload = () => {
        imagesRef.current[i] = img
        if (i === 0 || Math.abs(currentFrameRef.current - i) < 1) {
          drawFrame(currentFrameRef.current)
        }
      }
      imagesRef.current[i] = img
    }

    // Smooth lerp scroll render loop
    const render = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight
      if (scrollMax > 0) {
        const scrollFraction = Math.max(0, Math.min(1, window.scrollY / scrollMax))
        targetFrameRef.current = scrollFraction * (TOTAL_FRAMES - 1)
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
      {/* HD Canvas background layer with high definition contrast & sharpness filters */}
      <canvas
        ref={canvasRef}
        style={{ imageRendering: '-webkit-optimize-contrast' }}
        className="h-full w-full object-cover opacity-85 contrast-[1.08] brightness-[1.04] saturate-[1.06] transition-all duration-500 dark:opacity-90 dark:contrast-[1.12] dark:brightness-[1.06] dark:saturate-[1.08]"
      />

      {/* Crisp readability vignette overlay with high clarity */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,transparent_25%,var(--color-vignette-mid)_70%,var(--color-vignette-outer)_98%)] opacity-75 transition-colors duration-500 [--color-vignette-mid:rgba(246,244,240,0.55)] [--color-vignette-outer:rgba(246,244,240,0.88)] dark:[--color-vignette-mid:rgba(15,23,42,0.60)] dark:[--color-vignette-outer:rgba(15,23,42,0.92)]" />

      {/* Subtle background color wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/15 via-cream/25 to-cream/50 dark:from-slate-950/20 dark:via-slate-950/35 dark:to-slate-950/65" />
    </div>
  )
}


