/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors: {
      //       Elements
      // Background #fef6e4
      // Headline #001858
      // Paragraph #172c66
      // Button #f582ae
      // Button text #001858
      // Illustration
      // Stroke #001858
      // Main #f3d2c1
      // Highlight #fef6e4
      // Secondary #8bd3dd
      // Tertiary #f582ae

      // Light theme colors
      'light-bg': '#fef6e4',
      'light-headline': '#001858',
      'light-paragraph': '#172c66',
      'light-button': '#f582ae',
      'light-button-text': '#001858',
      'light-stroke': '#001858',
      'light-main': '#f3d2c1',
      'light-highlight': '#fef6e4',
      'light-secondary': '#8bd3dd',
      'light-tertiary': '#f582ae',
      'light-error': '#ff0000',

      // Dark theme colors

      //       Elements
      // Background #16161a
      // Headline #fffffe
      // Paragraph #94a1b2
      // Button #7f5af0
      // Button text #fffffe
      // Illustration
      // Stroke #010101
      // Main #fffffe
      // Highlight #7f5af0
      // Secondary #72757e
      // Tertiary #2cb67d

      'dark-bg': '#16161a',
      'dark-headline': '#fffffe',
      'dark-paragraph': '#94a1b2',
      'dark-button': '#7f5af0',
      'dark-button-text': '#fffffe',
      'dark-stroke': '#010101',
      'dark-main': '#fffffe',
      'dark-highlight': '#7f5af0',
      'dark-secondary': '#72757e',
      'dark-tertiary': '#2cb67d',
      'dark-error': '#ff0000',
    },
    extend: {},
  },
  plugins: [require('daisyui')],
};
