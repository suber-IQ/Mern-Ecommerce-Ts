/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ["Inter var",...defaultTheme.fontFamily.sans],
      // },
      colors:{
        primary: '#f1f5f9',
        secondary: '#4b5563',
        hovertext: '#1f2937',
        accent: '#2563eb',
        buttoncolor: '#0ea5e9',
      }
    },
  },
  plugins: [],
}