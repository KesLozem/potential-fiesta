/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
       screens: {
        '3xl': '1600px',
      },
      animation: {
        'text-scroll': 'text-scroll 7s linear infinite',
      },
      keyframes: {
        'text-scroll': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-130%)' },
        },
      },
    },
  },
  plugins: [
    require('daisyui'),
    "prettier-plugin-tailwindcss",
    require('tailwind-scrollbar-hide')
  ],
}

