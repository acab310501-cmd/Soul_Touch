/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F9F5F0',
          200: '#F2EBE0',
          300: '#E8DCC9',
          400: '#D9C7A8',
        },
        chocolate: {
          50: '#F5F0EB',
          100: '#E8DAD0',
          200: '#C9A98E',
          300: '#8B6F55',
          400: '#5D4633',
          500: '#3D2B1F',
          600: '#2A1E16',
          700: '#1A1412',
        },
        gold: {
          50: '#FBF6EC',
          100: '#F3E8CC',
          200: '#E8D2A0',
          300: '#D4A574',
          400: '#C9A96E',
          500: '#B8924F',
          600: '#9A783E',
        },
        sage: {
          50: '#EFF5F2',
          100: '#D6E5DE',
          200: '#A8C8BA',
          300: '#8DB5A9',
          400: '#6E9C8E',
          500: '#588877',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'breathe': 'breathe 6s ease-in-out infinite',
        'breathe-slow': 'breathe 8s ease-in-out infinite',
        'float': 'float 7s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
