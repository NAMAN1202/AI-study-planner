/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'figma-dark': '#0F172A',
        'figma-blue': '#2563EB'
      }
    },
  },
  plugins: [],
}