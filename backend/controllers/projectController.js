const ProjectModel = require("../models/Projects");
const cloudinary = require("cloudinary");

exports.getProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, description, liveLink, githubRepo, featured } = req.body;
    const image = req.files.image && req.files.image[0];

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    if (!title || !description || !liveLink) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const imageUrl = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });

    const projectData = {
      title,
      description,
      liveLink,
      githubRepo,
      featured: featured === "true" ? true : false,
      image: imageUrl.secure_url,
    };

    const project = new ProjectModel(projectData);
    await project.save();

    res.json({ success: true, message: "Project added." });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
