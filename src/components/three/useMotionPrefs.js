import { useEffect, useState } from 'react'

export function useReducedMotionPreference() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [])
  return reduced
}

export function useIsTouch() {
  const [touch, setTouch] = useState(false)
  useEffect(() => {
    setTouch(window.matchMedia('(hover: none), (pointer: coarse)').matches)
  }, [])
  return touch
}