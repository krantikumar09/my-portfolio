const express = require("express");
const {
  getProjects,
  createProject,
} = require("../controllers/projectController");

const projectRoute = express.Router();

projectRoute.get("/get", getProjects);
projectRoute.post("/create", createProject);

module.exports = projectRoute;
