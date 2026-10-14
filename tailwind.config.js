/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx}', './src/**/*.{js,jsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#0F6B4F', 50: '#EEF6F2', 700: '#0C5A42' },
        ink: '#14231C',
        muted: '#5F6B66',
        line: '#E2E4DF',
        field: '#FAFAF8',
        canvas: '#F4F3EE',
      },
      fontFamily: {
        manrope: ['Manrope_400Regular'],
        'manrope-medium': ['Manrope_500Medium'],
        'manrope-semibold': ['Manrope_600SemiBold'],
        'manrope-bold': ['Manrope_700Bold'],
        'manrope-extrabold': ['Manrope_800ExtraBold'],
      },
    },
  },
  plugins: [],
};