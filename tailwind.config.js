/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0b1326',
        'on-background': '#dae2fd',
        surface: {
          DEFAULT: '#0b1326',
          dim: '#0b1326',
          bright: '#31394d',
          variant: '#2d3449',
          tint: '#c0c1ff',
          container: {
            lowest: '#060e20',
            low: '#131b2e',
            DEFAULT: '#171f33',
            high: '#222a3d',
            highest: '#2d3449',
          },
        },
        'on-surface': {
          DEFAULT: '#dae2fd',
          variant: '#c7c4d7',
        },
        primary: {
          DEFAULT: '#c0c1ff',
          container: '#8083ff',
        },
        'on-primary': {
          DEFAULT: '#1000a9',
          container: '#0d0096',
        },
        secondary: {
          DEFAULT: '#6bd8cb',
          container: '#29a195',
        },
        tertiary: {
          DEFAULT: '#ffb77d',
          container: '#d97707',
        },
        error: {
          DEFAULT: '#ffb4ab',
          container: '#93000a',
        },
        'on-error-container': '#ffdad6',
        outline: {
          DEFAULT: '#908fa0',
          variant: '#464554',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};