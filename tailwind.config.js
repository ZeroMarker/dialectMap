/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mandarin': '#FF6B6B',
        'wu': '#4ECDC4',
        'yue': '#45B7D1',
        'min': '#FFA07A',
        'hakka': '#98D8C8',
        'xiang': '#F7DC6F',
        'gan': '#BB8FCE',
        'hui': '#82E0AA',
        'pinghua': '#F1948A',
      },
    },
  },
  plugins: [],
}
