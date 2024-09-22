import "./App.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between gap-2 flex-col sm:flex-row ">
        {/* Fixed Left Side */}
        <div className="basis-1/2">
          <Hero />
        </div>

        {/* Right Side Scrolling Content */}
        <div className="basis-1/2 h-screen py-12 overflow-y-auto">
          <div className="h-full">
            <About />
            <Projects />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
