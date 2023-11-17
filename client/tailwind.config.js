/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      "burlywood": "#deb887",
      "verde-sabana": "#599056",
      "verde-hoja": "#8b9e5c",
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

