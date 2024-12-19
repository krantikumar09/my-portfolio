import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

// get all projects
export const getProjects = async () => {
  const res = await axios.get(`${api_url}/api/project/get`);
  return res.data;
};


