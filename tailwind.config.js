module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          black: '#0C0C0C',
          dark: '#121212',
          green: '#00FF00',
          brightGreen: '#5FFF5F',
          gray: '#808080',
          white: '#F5F5F5',
          blue: '#0A84FF',
          purple: '#BF5AF2',
          yellow: '#FFD60A',
          red: '#FF453A',
        },
      },
      fontFamily: {
        mono: [
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
    },
  },
  plugins: [],
};