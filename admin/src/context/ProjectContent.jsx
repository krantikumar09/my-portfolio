// src/context/ProjectContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import projectService from "../lib/projectService";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await projectService.getAllProjects();
      setProjects(response.data.allProjects); 
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createProject = async (projectData) => {
    await projectService.createProject(projectData);
    await fetchProjects();
  };

  const updateProject = async (id, projectData) => {
    await projectService.updateProject(id, projectData);
    await fetchProjects();
  };

  const deleteProject = async (id) => {
    await projectService.deleteProject(id);
    await fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        fetchProjects,
        createProject,
        updateProject,
        deleteProject,
        isLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
