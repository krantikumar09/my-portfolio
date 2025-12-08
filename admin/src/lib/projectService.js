import api from "./axios";

const projectService = {
  getAllProjects: async () => {
    return api.get("/project/");
  },

  createProject: async (formData) => {
    return api.post("/project/create", formData);
  },

  updateProject: async (id, formData) => {
    return api.put(`/project/update/${id}`, formData);
  },

  deleteProject: async (id) => {
    return api.delete(`/project/delete/${id}`);
  },

  login: async (credentials) => {
    return api.post("/auth/login", credentials);
  },
};

export default projectService;
