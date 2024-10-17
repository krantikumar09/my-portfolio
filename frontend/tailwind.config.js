/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.jsx",
    "./src/components/Navbar.jsx",
    "./src/components/Hero.jsx",
    "./src/components/About.jsx",
    "./src/components/.jsx",
    "./src/components/ProjectItem.jsx",
    "./src/components/SectionTitle.jsx",
    "./src/components/Contact.jsx",
    "./src/components/Footer.jsx",
    "./src/components/Projects.jsx",
    "./src/pages/Home.jsx",
    "./src/pages/ProjectsPage.jsx",
  ],
  theme: {
    extend: {
      colors: {
        priText: "#E2E8F0",
        secText: "#94A3B8",
        green: "#4CAF50",
        darkBlue: "#0a2640",
      },
      backgroundColor: {
        secBg: "#94A3B8",
        green: "#4CAF50",
        greenHover: "#388E3C",
        darkBlue: "#0a2640",
        lightBlue: "#fff",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
};
