/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'blob': 'blob 15s infinite',
        'float': 'float 10s infinite',
        'fade-in-up': 'fade-in-up 0.7s ease-out',
        'animation-delay-200': 'fade-in-up 0.7s ease-out 0.2s',
        'animation-delay-400': 'fade-in-up 0.7s ease-out 0.4s',
        'animation-delay-600': 'fade-in-up 0.7s ease-out 0.6s',
        'animation-delay-2000': 'blob 15s infinite 2s'
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(50px, 100px) scale(1.2)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
};