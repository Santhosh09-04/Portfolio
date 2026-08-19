import { type Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0d0d1a',
          card: '#1a1a2e',
          muted: '#6b6978',
          ink: '#e8e6e3',
          accent: {
            blue: '#5b82e6',
            lav: '#8a6fe8',
            peach: '#e8877a',
            sky: '#7ea6ff',
          },
        },
        light: {
          bg: '#f7f5f2',
          card: '#ffffff',
          muted: '#6b6978',
          ink: '#2b2a33',
          accent: {
            blue: '#5b82e6',
            lav: '#8a6fe8',
            peach: '#e8877a',
            sky: '#7ea6ff',
          },
        },
      },
    },
  },
  plugins: [],
}