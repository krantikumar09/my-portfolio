import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProjectItem from "./ProjectItem";
import SectionTitle from "./SectionTitle";
import { faTurnUp } from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
  return (
    <section id="projects" className="mt-32 relative">
      <SectionTitle title={"Projects"} />

      <div className="flex flex-col items-start gap-8">
        <ProjectItem limit={3} />

        <div className="w-full text-center sm:text-right mt-10">
          <Link
            to="/projects"
            className="text-right inline-block text-priText py-2 px-4 rounded-md cursor-pointer hover:bg-transparent underline"
          >
            View More{" "}
            <FontAwesomeIcon
              icon={faTurnUp}
              className="text-green text-xs ms-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
