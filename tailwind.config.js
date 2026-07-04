/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        ivory: '#FAF9F7',
        charcoal: '#1C1C1C',
        slate: '#4A4A4A',
        accent: '#0a1db0',
        'accent-warm': '#C4892A',
        divider: '#E4E0D8',
        surface: '#F5F4F2',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fire: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 2px rgba(196, 137, 42, 0.4))' },
          '25%': { transform: 'scale(1.15) rotate(-3deg)', filter: 'drop-shadow(0 0 6px rgba(196, 137, 42, 0.7))' },
          '50%': { transform: 'scale(1.05) rotate(2deg)', filter: 'drop-shadow(0 0 10px rgba(196, 137, 42, 0.9))' },
          '75%': { transform: 'scale(1.2) rotate(-1deg)', filter: 'drop-shadow(0 0 8px rgba(232, 89, 12, 0.8))' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-down': 'slide-down 0.4s ease-out forwards',
        fire: 'fire 1.2s ease-in-out infinite',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
        34: '8.5rem',
        38: '9.5rem',
        42: '10.5rem',
        46: '11.5rem',
        50: '12.5rem',
        54: '13.5rem',
        58: '14.5rem',
        62: '15.5rem',
        66: '16.5rem',
        70: '17.5rem',
        74: '18.5rem',
        78: '19.5rem',
        82: '20.5rem',
        86: '21.5rem',
        90: '22.5rem',
        94: '23.5rem',
        98: '24.5rem',
      },
    },
  },
  plugins: [],
}
