import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { getProjects } from "../api/projectApi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ProjectItem = ({ limit }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };

    gsap.from(".project-item", {
      scrollTrigger: {
        trigger: "#projects", // The element that triggers the animation
        start: "top 80%", // When the top of the section hits 80% of the viewport height
        end: "bottom 60%", // When the bottom of the section hits 60% of the viewport height
        toggleActions: "play none none none", // Plays animation once when scrolled into view
      },
      y: 50, // Move the content 50px from the bottom to the top
      opacity: 0, // Start with opacity 0
      duration: 1, // Duration of the animation
      ease: "power3.out", // Easing effect
    });

    fetchProjects();
  }, []);

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="flex flex-col gap-6">
      {displayedProjects.map((project) => (
        <div
          key={project._id}
          className="project-item sm:p-4 rounded cursor-pointer  transition-all group"
        >
          <a
            className="flex items-start flex-col md:flex-row gap-4"
            href={project.url}
            target="_blank"
          >
            <div className="w-[120px] h-[80px]">
              <img
                className="w-full h-full rounded object-cover"
                src={project.image}
                alt=""
                loading="lazy"
              />
            </div>

            <div className="flex-1">
              <h5 className="text-md font-semibold text-priText group-hover:text-green transition-all mb-2">
                {project.title}
                <FontAwesomeIcon
                  icon={faArrowTurnUp}
                  className="text-priText ms-4 text-xs group-hover:text-green group-hover:-translate-y-1 transition-all"
                />
              </h5>
              <p className="text-sm leading-normal font-medium text-secText">
                {project.description}
              </p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProjectItem;
