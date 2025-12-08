import { Button } from "../components/ui/button";
import { Plus, Loader2, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useProjects } from "../context/ProjectContent";
import { useAuth } from "../context/AuthContext";
import ProjectForm from "../components/projects/ProjectForm";
import ProjectCard from "../components/projects/ProjectCard";

const HomePage = () => {
  const { projects, isLoading } = useProjects();
  const { isAdmin, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Project Dashboard
        </h1>
        <div className="flex gap-4">
          {isAdmin ? (
            <>
              <ProjectForm>
                <Button className="flex items-center">
                  <Plus className="mr-2 h-4 w-4" /> Add Project
                </Button>
              </ProjectForm>
              <Button variant="destructive" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="link">Admin Login</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No projects found.{" "}
            {isAdmin && 'Click "Add Project" to get started.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
