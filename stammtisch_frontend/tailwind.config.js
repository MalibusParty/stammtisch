/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#201a19',
        'darkess': '#2B2221',
        'autumn': '#8F2E35',
        'peach': '#E17260',
        'primary': '#ffb4a7',
        'outline': '#a08c89',
        'bright': '#fffff2'
      },
      fontFamily: {
        'head': ['Roboto'],
        'italic': ['Sansita'],
        'sans': ['Alef', 'sans-serif']
      }
    },
  },
  plugins: [],
}

