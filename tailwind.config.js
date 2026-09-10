module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#0a0a0a',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 10px 30px -10px rgba(0,0,0,0.15), 0 20px 60px -20px rgba(0,0,0,0.25)',
        inset: 'inset 0 1px 2px rgba(0,0,0,0.06), inset 0 -1px 0 rgba(255,255,255,0.6)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'group-hover', 'focus-visible'],
      textColor: ['active', 'group-hover', 'focus-visible'],
      ringColor: ['focus-visible'],
      ringWidth: ['focus-visible'],
      ringOffsetColor: ['focus-visible'],
    },
  },
  plugins: [],
}
