import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  mode: 'jit',
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
        dark: '#272727',
        bg: '#F1F3F4',
        gray: '#7D7D7D',
        'light-red': '#F9837C',
        'light-green': '#50C099',
        success: '#0B8A00',
        'light-yellow': '#FFC565',
        pale: '#EBEFF2',
        modal: 'rgba(0,0,0, 0.3)',
      },
      boxShadow: {
        dropdown: '0px 4px 14px 0px rgba(0,0,0,0.1)',
      },
    },
  },
  safelist: ['text-green', 'text-yellow', 'text-red', 'w-[17vw]'],
  plugins: [require('tailwind-scrollbar-hide')],
};

export default config;
