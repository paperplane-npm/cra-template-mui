/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // ← 不使用 preflight，因为我们使用了 mui 的 <CssBaseline>
  },
  plugins: [],
}
