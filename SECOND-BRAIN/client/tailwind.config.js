/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme
        'd-bg':      '#12121A',
        'd-surface': '#1C1C28',
        'd-card':    '#242433',
        'd-border':  '#2E2E45',
        // Light theme
        'l-bg':      '#F0EFFF',
        'l-surface': '#FFFFFF',
        'l-card':    '#F7F6FF',
        'l-border':  '#E2E0FF',
        // Accent
        'violet':  '#7C6FCD',
        'pink':    '#E879A0',
        'sky':     '#38BDF8',
        'amber':   '#FBBF24',
        'emerald': '#34D399',
        'coral':   '#FB7185',
        // Type
        'c-article': '#38BDF8',
        'c-tweet':   '#FBBF24',
        'c-video':   '#FB7185',
        'c-pdf':     '#A78BFA',
        'c-image':   '#34D399',
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':   'fadeIn 0.4s ease forwards',
        'slide-up':  'slideUp 0.4s ease forwards',
        'slide-in':  'slideIn 0.35s ease forwards',
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'float':     'float 4s ease-in-out infinite',
        'shimmer':   'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn:   { from: { opacity: 0 },                           to: { opacity: 1 } },
        slideUp:  { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideIn:  { from: { opacity: 0, transform: 'translateX(16px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        bounceIn: { from: { opacity: 0, transform: 'scale(0.85)' },  to: { opacity: 1, transform: 'scale(1)' } },
        float:    { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-5px)' } },
        shimmer:  { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}