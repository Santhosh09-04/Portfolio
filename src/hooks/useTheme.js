import { useEffect, useState } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then prefers-color-scheme
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    // Fallback: check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Apply class to html element
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    // Save to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    }
  }, [isDark])

  return [isDark, setIsDark]
}