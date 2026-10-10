/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#194838',
          light: '#287a5e',
        },
        background: '#f3f7f5',
      }
    },
  },
  plugins: [],
}
