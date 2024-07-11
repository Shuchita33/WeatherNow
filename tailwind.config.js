/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'ourcol': {
        200: '#9CAFAA',
        300: '#BED7DC',
        500: '#76ABAE',
        600: '#7BD3EA',
        700: '#AAD7D9',
        800: '#FFEC9E',
        801: '#E5DDC5',
      },
      // ...
    },
  },
  plugins: [],
}

