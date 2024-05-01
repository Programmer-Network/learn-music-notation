/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,tsx,ts,js,jsx,css,scss,sass}"],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        primary: "#FACC15",
        muted: "#212121",
      },
    },
  },
  plugins: [],
};
