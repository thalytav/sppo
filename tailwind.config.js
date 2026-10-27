/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        its: {
          blue: '#002B49', // Warna khas biru almamater ITS
          gold: '#FFB81C', // Warna khas kuning/emas ITS
          cyan: '#0085CA',
          light: '#F4F7FB',
          dark: '#0B192C'
        }
      }
    },
  },
  plugins: [],
}
