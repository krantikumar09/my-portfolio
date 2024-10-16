const Project = require("../models/Projects");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  const { title, description, image, url } = req.body;
  const project = new Project({
    title,
    description,
    image,
    url,
  });
  try {
    const savedProject = await project.save();
    res.status(200).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
