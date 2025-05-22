import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'very-peri': {
          DEFAULT: '#6667AB',
          50: '#D7D7EA',
          100: '#C9C9E3',
          200: '#ADADD4',
          300: '#9191C5',
          400: '#7676B6',
          500: '#6667AB',
          600: '#54558E',
          700: '#424370',
          800: '#303152',
          900: '#1E1F34',
        },
      },
    },
  },
  plugins: [],
}

export default config