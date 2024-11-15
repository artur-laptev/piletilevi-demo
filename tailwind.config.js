import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindcssPrimeui from 'tailwindcss-primeui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Roboto"', ...defaultTheme.fontFamily.sans],
        'mono': ['"Montserrat"', ...defaultTheme.fontFamily.mono],
      },
      maxWidth: {
        '2xl': '1660px',
        'screen-2xl': '1660px',
      },
      colors: {
        primary: '#19005F',
        secondary: '#626262',
        gray: '#D6D2E1',
      },
      boxShadow: {
        'pl': '0 4px 20px 0 rgba(214, 223, 229, 1)',
        'pl-1': '0 4px 21px -5 rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [
    tailwindcssPrimeui,
  ],
}
