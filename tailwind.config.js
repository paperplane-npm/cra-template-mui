/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root', // ← 加上这一行，才能覆盖 UI 库的样式
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false, // ← 不使用 preflight，因为我们使用了 mui 的 <CssBaseline>
  },
  plugins: [],
}
