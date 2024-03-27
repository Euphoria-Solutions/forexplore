import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // mode: 'jit',
  theme: {
    extend: {
      colors: {
        customPurple: '#9747FF',
        customDarkBlue: '#1B223C',
        ffffff: '#FFFFFF',
        green: '#24e42a',
        yellow: '#c5c80d',
        red: 'red',
        white: '#ffffff',
      },
    },
  },
  safelist: ['text-green', 'text-yellow', 'text-red'],
  plugins: [require('tailwind-scrollbar-hide')],
};

export default config;
