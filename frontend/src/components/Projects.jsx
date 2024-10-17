import { Link } from "react-router-dom";
import ProjectItem from "./ProjectItem";
import SectionTitle from "./SectionTitle";

const Projects = () => {
  return (
    <section id="projects" className="mt-32 relative">
      <SectionTitle title={"Projects"} />

      <div className="flex flex-col items-start gap-8">
        <ProjectItem limit={3} />

        <div className="w-full text-center mt-12">
          <Link
            to="/projects"
            className="btn text-priText bg-transparent border border-green py-2 px-4 rounded-md cursor-pointer hover:bg-transparent"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
