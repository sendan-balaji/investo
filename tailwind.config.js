/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./{App,components,pages,layouts}/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: { extend: { colors: { background: '#0d1117', surface: '#161b22', accent: '#6d5dfc', positive: '#00c46a', negative: '#ff5c5c', neutral: '#f5a623', 'text-primary': '#e6edf3', 'text-secondary': '#8b949e', border: '#21262d', glow: '#6d5dfc40' } } },
  plugins: [],
}