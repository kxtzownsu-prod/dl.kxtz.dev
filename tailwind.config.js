/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  darkMode: 'true',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1e1e2e',
        bg_secondary: '#313244',
        primary: '#cba6f7',
        secondary: '#8f93ac',
        github: '#0d1117',
      },
    },
    fontFamily: {
      'Space ': ['"Space Grotesk"', 'serif'],
      'mono ': ['"Space Mono"', 'monospace']
    },
  },
  plugins: [],
}

