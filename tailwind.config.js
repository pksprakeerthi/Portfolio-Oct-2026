/** @type {import('tailwindcss').Config} */
// "Dreamy night" palette. Token names are kept from the first version so no
// component needs renaming:  volt = bubblegum pink · lav = lavender · ink = plum.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#17111f',
          900: '#1e1729',
          800: '#271e35',
          700: '#32274a',
          600: '#43365f',
        },
        volt: {
          DEFAULT: '#ff9ecf',
          soft: '#ffc4e1',
          dim: '#c4608f',
        },
        lav: {
          DEFAULT: '#c9b6ff',
          soft: '#e2d8ff',
          dim: '#7d65c4',
        },
        mint: {
          DEFAULT: '#9af0d0',
          soft: '#c9f8e6',
        },
        // warmer, plum-tinted greys instead of cool slate
        slate: {
          100: '#f4eefa',
          200: '#e9e1f3',
          300: '#d3c8e2',
          400: '#b3a6c7',
          500: '#9486a6',
          600: '#6c5f80',
          700: '#4d4160',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'ui-rounded', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Quicksand', 'Nunito', 'ui-rounded', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 26px rgba(255,158,207,0.30)',
        'glow-lav': '0 0 26px rgba(201,182,255,0.32)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        blink: {
          '0%, 92%, 100%': { transform: 'scaleY(1)' },
          '96%': { transform: 'scaleY(0.1)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        twinkle: 'twinkle 3.2s ease-in-out infinite',
        blink: 'blink 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
