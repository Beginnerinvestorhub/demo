/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        'mechanica-moonlight-blue': 'var(--mechanica-moonlight-blue)',
        'mechanica-moonlight-blue-light': 'var(--mechanica-moonlight-blue-light)',
        'mechanica-moonlight-blue-dark': 'var(--mechanica-moonlight-blue-dark)',

        // Wood Tones
        'mechanica-birch-light': 'var(--mechanica-birch-light)',
        'mechanica-birch-medium': 'var(--mechanica-birch-medium)',
        'mechanica-birch-dark': 'var(--mechanica-birch-dark)',
        'mechanica-oak-light': 'var(--mechanica-oak-light)',
        'mechanica-oak-medium': 'var(--mechanica-oak-medium)',
        'mechanica-oak-dark': 'var(--mechanica-oak-dark)',

        // Metals
        'mechanica-brushed-copper': 'var(--mechanica-brushed-copper)',
        'mechanica-polished-brass': 'var(--mechanica-polished-brass)',
        'mechanica-stainless-steel': 'var(--mechanica-stainless-steel)',
        'mechanica-cast-iron': 'var(--mechanica-cast-iron)',

        // Text
        'mechanica-text-primary': 'var(--mechanica-text-primary)',
        'mechanica-text-secondary': 'var(--mechanica-text-secondary)',
        'mechanica-text-wood': 'var(--mechanica-text-wood)',

        // Legacy/Compat (Mapping to mechanica equivalents or keeping for safety)
        'Ordinatus-professional-blue': 'var(--mechanica-moonlight-blue)',
        'Ordinatus-brass-gold': 'var(--mechanica-polished-brass)',
        'Ordinatus-steel-gray': 'var(--mechanica-stainless-steel)',
      },
      fontFamily: {
        'heading': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Inter', 'Helvetica Neue', 'sans-serif'],
        'mono': ['Roboto Mono', 'Courier New', 'monospace'],
        'technical': ['Source Code Pro', 'Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'rotate-slow': 'rotate 20s linear infinite',
        'rotate-medium': 'rotate 10s linear infinite',
        'rotate-fast': 'rotate 5s linear infinite',
        'rotate-reverse': 'rotate-reverse 15s linear infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'rotate-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(79, 115, 142, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(79, 115, 142, 0.8)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};