// windi.config.js
import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  extract: {
    include: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  },
  preflight: false,
  darkMode: false,
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
    },
  },
  plugins: [],
})
