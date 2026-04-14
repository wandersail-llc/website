/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        rule: 'var(--color-rule)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '1100px',
        prose: '700px',
      },
    },
  },
  plugins: [],
};
