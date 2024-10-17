import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Hero = () => {
  const headRef = useRef(null);
  const navRef = useRef(null);
  const socialRef = useRef(null);
  const [activeSection, setActiveSection] = useState(sections[0].id);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observe each section
    sections.forEach((section) => {
      const sectionElement = document.getElementById(section.id);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;

          if (
            scrollPosition >= elementTop &&
            scrollPosition < elementTop + elementHeight
          ) {
            setActiveSection(section.id);
          }
        }
      });
    };

    gsap.fromTo(
      headRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );

    gsap.fromTo(
      navRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5 }
    );

    gsap.fromTo(
      socialRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 2 }
    );

    return () => {
      // Cleanup: unobserve all sections
      sections.forEach((section) => {
        const sectionElement = document.getElementById(section.id);
        if (sectionElement) {
          observer.unobserve(sectionElement);
        }
      });
    };
  }, [sections]);

  const handleSetActive = (id) => {
    setActiveSection(id);
  };

  const handleSmoothScroll = (event) => {
    event.preventDefault(); // Prevent default anchor click behavior

    // Get the target ID from the href attribute
    const targetId = event.currentTarget.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Scroll to the target element smoothly
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div
        id="hero"
        className="flex items-start flex-col justify-between  text-white h-screen py-12"
      >
        <div ref={headRef} className="flex  flex-col">
          <h1 className="text-priText text-4xl font-bold mb-6">
            <span className="text-green">Hi!</span> I'm Krantikumar Mathapati
          </h1>
          <h4 className="text-priText text-xl font-semibold mb-4">
            Full Stack Web Developer Based in Pune
          </h4>
          <p className="text-base text-secText font-normal mb-3">
            I love building beautiful, timeless websites & digital experiences.
          </p>

          <div className="flex gap-4 mt-6">
            <a href="/My_Resume.pdf" download="krantikumar_cv.pdf">
              <button className="btn cursor-pointer bg-green text-white py-2 px-4 border-none outline-none hover:bg-greenHover">
                Download CV
              </button>
            </a>
            <a href="#contact">
              <button className="btn text-priText bg-transparent border border-green py-2 px-4 rounded-md cursor-pointer hover:bg-transparent">
                Contact Me
              </button>
            </a>
          </div>
        </div>

        <nav ref={navRef} className="nav hidden lg:block">
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() =>
                    handleSetActive(section.id) && handleSmoothScroll
                  }
                  className={`group flex items-center py-3 ${
                    activeSection === section.id ? "text-white" : ""
                  }`}
                >
                  <span
                    className={`nav-indicator mr-4 h-px w-8 ${
                      activeSection === section.id
                        ? "w-16 bg-slate-200"
                        : "bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200"
                    }`}
                  ></span>
                  <span
                    className={`nav-text text-xs font-bold uppercase tracking-widest ${
                      activeSection === section.id
                        ? "text-slate-200"
                        : "text-slate-500 group-hover:text-slate-200"
                    }`}
                  >
                    {section.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* social links */}
        <div ref={socialRef} className="flex items-center gap-6 mt-20">
          <a
            className="hover:-translate-y-1 transition-all"
            href="https://instagram.com"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-priText text-2xl"
            />
          </a>
          <a
            className="hover:-translate-y-1 transition-all"
            href="https://linkedin.com"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="text-priText text-2xl"
            />
          </a>
          <a
            className="hover:-translate-y-1 transition-all"
            href="https://github.com/krantikumar09"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="text-priText text-2xl"
            />
          </a>
        </div>
      </div>
    </>
  );
};

export default Hero;
