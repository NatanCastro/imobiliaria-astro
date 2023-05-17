/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        darkBlue: '#1E3C5C'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}
