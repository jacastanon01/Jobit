const { fontFamily } = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],

  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      boxShadow: {
        searchbar: '0px 15px 34px 0px rgba(0, 0, 0, 0.02)',
        xs: ' 0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
        xsdark: '0px 2px 3px 0px rgba(255, 255, 255, 0.1)',
      },
      maxWidth: {
        '400px': '400px', // Custom max-width
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#0BAB7C',
        },
        secondary: {
          green: '#C7F4C2',
          purple: '#D7D0FF',
          yellow: '#FDDD8C',
          pink: '#FFBBD7',
        },
        natural: {
          1: '#F4F4F4',
          2: '#F1F1F5',
          3: '#FAFAFB',
          4: '#F5F5F8',
          5: '#E2E2EA',
          6: '#92929D',
          7: '#696974',
          8: '#44444F',
        },
        darkbg: {
          1: '#13131A',
          2: '#1C1C24',
          3: '#21212B',
          4: '#2C2C2C',
        },
        base: {
          white: '#FFFFFF',
          black: '#171725',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
