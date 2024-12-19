/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/pages/AllProjects.jsx",
    "./src/components/Sidebar.jsx",
    "./src/pages/AddProject.jsx",
    "./src/components/Title.jsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        dmSans: { "DM Sans": "sans-serif" },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
