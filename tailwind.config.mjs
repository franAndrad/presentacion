/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        accent: {
          DEFAULT: '#0087c8',
          glow: 'rgba(0, 135, 200, 0.4)',
        },
      },
      fontFamily: {
        mono: ['Geist Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
