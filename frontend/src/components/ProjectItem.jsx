import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { getProjects } from "../api/projectApi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Skeleton from "react-loading-skeleton";

gsap.registerPlugin(ScrollTrigger);
const ProjectItem = ({ limit }) => {
  const projectRefs = useRef([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.log("Error in Fetching projects: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();

    projectRefs.current.forEach((project, index) => {
      gsap.fromTo(
        project,
        { y: 40, opacity: 0 }, // Initial position (bottom and hidden)
        {
          y: 0, // Final position (aligned)
          opacity: 1, // Visible
          duration: 1, // Animation duration
          delay: index * 0.5, // Staggering effect for each project
          scrollTrigger: {
            trigger: project,
            start: "top 80%", // When to start animation (80% of the viewport)
            toggleActions: "play none none reverse", // Plays on scroll, reverse on scroll up
          },
        }
      );
    });
  }, []);

  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="flex flex-col gap-6">
      {isLoading
        ? Array(5)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="flex gap-4 items-start">
                {/* Left side: Image skeleton */}
                <Skeleton width={120} height={80} baseColor="#0a2640" highlightColor="#133b5e"/>
                {/* Right side: Content skeleton */}
                <div className="flex flex-col gap-2">
                  <Skeleton width={200} height={20} baseColor="#0a2640" highlightColor="#133b5e"/>
                  <Skeleton width={300} height={15} baseColor="#0a2640" highlightColor="#133b5e"/>
                </div>
              </div>
            ))
        : displayedProjects.map((project, index) => (
            <div
              key={project._id}
              className="project-item sm:p-4 rounded cursor-pointer  transition-all group"
              ref={(el) => (projectRefs.current[index] = el)}
            >
              <a
                className="flex items-start flex-col md:flex-row gap-4"
                href={project.liveLink}
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
