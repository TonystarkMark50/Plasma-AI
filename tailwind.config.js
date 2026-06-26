export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'oceanic-noir':          '#172B36',
        'nocturnal-expedition':  '#114C5A',
        'mystic-mint':           '#D9E8E2',
        'arctic-powder':         '#F1F6F4',
        'forsythia':             '#FFC801',
        'deep-saffron':          '#FF9932',
      },
      fontFamily: {
        display: ['JetBrains Mono', 'monospace'],
        body:    ['Inter', 'sans-serif'],
      },
      maxWidth: { site: '1280px' },
    },
  },
  plugins: [],
};
