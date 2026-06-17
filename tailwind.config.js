/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#f5eddb',
        paper:     '#ede3ce',
        cream:     '#faf5ea',
        ink:       '#1c0d04',
        brown:     '#2a1208',
        terra:     '#b5420a',
        gold:      '#c8922a',
        sepia:     '#6b4c2a',
        muted:     '#9a7b5a',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        elegant: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script:  ['"Pinyon Script"', 'cursive'],
        sans:    ['Jost', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
