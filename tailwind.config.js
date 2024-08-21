/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'WHITE': '#F2E3FC',
        'LILAC': '#DFA9FD',
        'VIOLET': '#9C4EDC',
        'LIGHT-PURPLE': '#5A189A',
        'PURPLE': '#3C096C',
        'DARK-PURPLE' : '#240046',
        'DARK-BLUE': '#10002B',
      },
    },
  },
  plugins: [],
};
