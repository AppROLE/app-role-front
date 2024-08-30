/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        WHITE: '#F2E3FC',
        LILAC: '#DFA9FD',
        VIOLET: '#9C4EDC',
        LIGHT_PURPLE: '#5A189A',
        PURPLE: '#3C096C',
        DARK_PURPLE: '#240046',
        DARK_BLUE: '#10002B',
        background: '#121212',
        button_color: '#1C1C1C'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      screens: {
        'big-cellphone': '1px'
      },
      backgroundImage: {
        'gradient-role': 'linear-gradient(90deg, #5A189A 0%, #9C4EDC 100%)',
      }
    }
  },
  plugins: []
}
