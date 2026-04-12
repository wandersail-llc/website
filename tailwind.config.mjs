/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          bg: 'var(--color-accent-bg)',
        },
        badge: {
          'active-bg': 'var(--color-badge-active-bg)',
          'active-text': 'var(--color-badge-active-text)',
          'soon-bg': 'var(--color-badge-soon-bg)',
          'soon-text': 'var(--color-badge-soon-text)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        content: '1100px',
        prose: '700px',
      },
    },
  },
  plugins: [],
};
