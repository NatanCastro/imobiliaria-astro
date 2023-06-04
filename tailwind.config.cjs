/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1E3C5C',
        'anti-flash-white': '#f0f0f0',
        silver: 'c0c0c0',
        gold: {
          700: '#ffd700',
          900: '#ffbf00'
        }
      },
      fontFamily: {
        sans: "'Roboto', sans-serif",
        poppins: "'Poppins', sans-serif"
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')]
}
