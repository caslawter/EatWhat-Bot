/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin';
export default {
  mode: 'jit',

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': ['"Open Sans"', 'serif'],
        bagel: ['"Bagel Fat One"', 'cursive'],
      },
      fontWeight: {
        300: '300',
        400: '400',
        600: '600',
        700: '700',
        800: '800',
      },
      screens: {
        'xs': '320px',   // Extra small screens
        'xss': '375px',
        'xsm': '425px',  // Extra small medium screens
        'sm': '640px',   // Small screens
        'md': '768px',   // Medium screens
        'lg': '1024px',  // Large screens
        'xl': '1280px',  // Extra large screens
        '2xl': '1440px', // 2 Extra large screens
        '3xl': '2000px'
      },
      colors: {
        customOrange: {
          light: '#fdba74',    // Slightly lighter red
          dark: '#fb923c',         // Slightly darker red
        },
        customBlack: 'rgb(24, 24, 56)',  // Define custom black color
        customYellow: '#FACC15', // Define custom yellow color
      },
      // note that images from public folder should be referenced from the root 
      // of the proj
      backgroundImage: {
        'parallax1': 'url("/pexels-palumalerba-2426546.jpg")',
        'parallax2': 'url("/pexels-simo-3544415.jpg")'
      },
      // Custom font-variation-settings utility
      fontVariationSettings: {
        wdth: 100,  // Add custom font variations here
      },
    },
  },
  plugins: [
    flowbitePlugin,
    function ({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari, and Opera */
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        /* Hide scrollbar for IE, Edge, and Firefox */
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', // IE and Edge
          'scrollbar-width': 'none', // Firefox
        },
      });
    },
    function ({ addComponents }) {
      // Add custom component for font with variation settings
      addComponents({
        '.open-sans-custom': {
          fontFamily: '"Open Sans", serif',
          fontStyle: 'normal',
          fontWeight: '400',  // Adjust as needed (300, 600, etc.)
          fontVariationSettings: '"wdth" 100',  // This applies the width variation
        },
      });
    },
  ],
};
