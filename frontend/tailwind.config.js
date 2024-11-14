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
      'light-border': '#001858',
      'light-headline': '#001858',
      'light-paragraph': '#172c66',
      'light-button': '#8D2C51',
      'light-button-text': '#EFF0FA',
      'light-stroke': '#001858',
      'light-main': '#f3d2c1',
      'light-highlight': '#fef6e4',
      'light-secondary': '#8bd3dd',
      'light-tertiary': '#8D2C51',
      'light-error': '#ff0000',

      'dark-bg': '#1b1b1e', // Fond sombre
      'dark-border': '#e3e3e5', // Bordure ou ligne de séparation
      'dark-headline': '#e3e3e5', // Texte principal
      'dark-paragraph': '#a0a5b1', // Texte secondaire
      'dark-button': '#9a7ff0', // Bouton d'action
      'dark-button-text': '#e3e3e5', // Texte du bouton
      'dark-stroke': '#2d2d31', // Ligne de séparation ou bordure
      'dark-main': '#2b2a33', // Fond principal de carte ou d’élément
      'dark-highlight': '#3a3a46', // Fond de notification ou accent
      'dark-secondary': '#4bbfcc', // Accent secondaire
      'dark-tertiary': '#c266a3', // Accent tertiaire
      'dark-error': '#ff4d4d', // Erreur
    },
    extend: {},
  },
  plugins: [require('daisyui')],
};
