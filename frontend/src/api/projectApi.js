import axios from "axios";

const API_URL = "http://localhost:5000/api/project/get";

// get all projects
export const getProjects = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
