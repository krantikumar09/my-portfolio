import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const Home = () => {
  return (
    <div className="py-12">
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;
