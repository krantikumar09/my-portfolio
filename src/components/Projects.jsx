import ProjectItem from "./ProjectItem";
import SectionTitle from "./sectionTitle";

const Projects = () => {
  return (
    <section id="projects" className="mt-32 relative">
      <SectionTitle title={"Projects"}/>

      <div className="flex flex-col items-start gap-8">
        <ProjectItem />
      </div>
    </section>
  );
};

export default Projects;
