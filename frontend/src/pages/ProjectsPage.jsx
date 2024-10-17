import { Link } from "react-router-dom";
import ProjectItem from "../components/ProjectItem";
import SectionTitle from "../components/SectionTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const ProjectsPage = () => {
  return (
    <div className="project-page">
      <div className="flex items-start gap-4 mb-4">
        <Link to={"/"}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-priText text-base"
          />
        </Link>
        <SectionTitle title={"All Projects"} />
      </div>
      <ProjectItem />
    </div>
  );
};

export default ProjectsPage;
