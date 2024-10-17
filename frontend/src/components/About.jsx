import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { assets } from "../assets/assets";
import SectionTitle from "./SectionTitle";

const About = () => {
  const descRef = useRef(null);
  const eduRef = useRef(null);
  const technoRef = useRef(null);
  const toolsRef = useRef(null);

  const technologies = [
    "HTML",
    "CSS",
    "JavaScript",
    "React JS",
    "Tailwind CSS",
    "Bootstrap",
    "Node JS",
    "Express",
    "MongoDB",
    "Git",
    "GitHub",
    "MySQL",
    "C",
    "Python",
  ];

  useEffect(() => {
    gsap.fromTo(
      descRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );

    gsap.fromTo(
      eduRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5 }
    );

    gsap.fromTo(
      technoRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 2 }
    );

    gsap.fromTo(
      toolsRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 2.5 }
    );
  }, []);

  return (
    <section id="about" className="text-white w-full mb-32">
      <SectionTitle title={"About"} />

      <div>
        <h2
          ref={descRef}
          className="text-sm sm:text-base font-medium text-priText leading-normal mb-14"
        >
          I create unique digital experiences tailored to your brand and goals.
          By merging creativity with functionality and staying ahead of design
          trends, I ensure every project not only looks stunning but also
          performs flawlessly.
        </h2>

        <div ref={eduRef} className="education">
          <h1 className="text-priText font-bold text-2xl relative after:absolute after:left-0 after:-bottom-1 after:w-1/2 after:h-[1px] after:bg-green inline">
            Education
          </h1>
          <div>
            <p className="mt-4 text-priText text-base font-semibold">
              Master of Computer Application
            </p>
            <p className="text-secText text-sm">
              Dr. D. Y. Patil School of Science and Technology, Tathawade, Pune
            </p>
          </div>

          <p className="mt-4 text-priText text-base font-semibold">
            Bachelor of Vocation (Computer Technology)
          </p>
          <p className="text-secText text-sm">
            Rajarshi Shahu Mahavidhyalaya, Latur
          </p>
        </div>

        <div ref={technoRef} className="technologies mt-12">
          <h1 className="text-priText font-bold text-2xl relative after:absolute after:left-0 after:-bottom-1 after:w-1/2 after:h-[1px] after:bg-green inline">
            Technologies I Know
          </h1>
          <div className="mt-4 flex items-center justify-start flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <p
                key={index}
                className="text-darkBlue text-xs sm:text-sm font-semibold px-2 py-1 bg-secBg inline rounded"
              >
                {tech}
              </p>
            ))}
          </div>
        </div>

        <div ref={toolsRef} className="tools mt-12">
          <h1 className="text-priText font-bold text-2xl relative after:absolute after:left-0 after:-bottom-1 after:w-1/2 after:h-[1px] after:bg-green inline">
            Tools I Use
          </h1>
          <div className="mt-4 flex items-center gap-3 sm:gap-5">
            <div className="flex items-center justify-center w-10 sm:w-12 aspect-square border border-secText rounded-lg cursor-pointer">
              <img className="w-3 sm:w-6" src={assets.vscode} alt="vs code" />
            </div>

            <div className="flex items-center justify-center w-10 sm:w-12 aspect-square border border-secText rounded-lg cursor-pointer">
              <img className="w-3 sm:w-6" src={assets.firebase} alt="vs code" />
            </div>

            <div className="flex items-center justify-center w-10 sm:w-12 aspect-square border border-secText rounded-lg cursor-pointer">
              <img className="w-3 sm:w-6" src={assets.mongodb} alt="mongodb" />
            </div>

            <div className="flex items-center justify-center w-10 sm:w-12 aspect-square border border-secText rounded-lg cursor-pointer">
              <img className="w-3 sm:w-6" src={assets.figma} alt="figma" />
            </div>

            <div className="flex items-center justify-center w-10 sm:w-12 aspect-square border border-secText rounded-lg cursor-pointer">
              <img className="w-3 sm:w-6" src={assets.git} alt="git" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
