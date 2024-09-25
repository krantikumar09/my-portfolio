import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { getProjects } from "../api/projectApi";

const ProjectItem = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {projects.map((project) => (
        <div
          key={project._id}
          className="sm:p-4 rounded cursor-pointer  transition-all group"
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
