const Project = require("../models/Project");

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.ststus(500).json({ message: error.message });
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
    res.status(201).json(savedProject);
  } catch (error) {
    res.ststus(500).json({ message: error.message });
  }
};
