import cloudinary from "../config/cloudinary.js";
import Project from "../models/Projects.js";
import fs from "fs";

const extractPublicIdFromUrl = (imageUrl) => {
  if (!imageUrl) return null;
  try {
    // e.g., .../v123456789/projects/image_name.jpg
    const parts = imageUrl.split("/");
    // Get the last part: "image_name.jpg"
    const filename = parts.pop();
    // Remove file extension: "image_name"
    const publicIdWithoutExtension = filename.split(".")[0];
    // Combine with the expected folder name: "projects/image_name"
    return `projects/${publicIdWithoutExtension}`;
  } catch (e) {
    console.error("Failed to parse Cloudinary URL for public ID:", e);
    return null;
  }
};

// Create Project
export const createProject = async (req, res) => {
  try {
    const { title, description, liveLink, githubRepo, tags, featured } =
      req.body;
    const image = req.files && req.files.image && req.files.image[0];

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    if (!title || !description || !liveLink) {
      fs.unlinkSync(image.path);
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const imageUrl = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
      folder: "portfolio",
    });

    fs.unlinkSync(image.path);

    let parsedTags = [];
    try {
      parsedTags = JSON.parse(tags);
    } catch (e) {
      // Fallback if it's sent as a plain space-separated string
      parsedTags = tags ? tags.split(" ") : [];
    }

    const projectData = {
      title,
      description,
      liveLink,
      githubRepo,
      tags: parsedTags, // stored as ['React', 'Node']
      featured: featured === "true" ? true : false,
      image: imageUrl.secure_url,
    };

    const newProject = new Project(projectData);
    await newProject.save();

    res.status(201).json({ success: true, message: "Project added." });
  } catch (error) {
    console.log("create projects: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Projects
export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find();
    if (!allProjects)
      return res
        .status(404)
        .json({ success: false, message: "Projects not found!" });

    return res.status(201).json({ success: true, allProjects });
  } catch (error) {
    console.log("get all projects: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Featured Projects
export const getFeaturedProjects = async (req, res) => {
  try {
    const featuredProjects = await Project.find({ featured: true });
    if (!featuredProjects)
      return res
        .status(404)
        .json({ success: false, message: "Projects not found!" });

    return res.status(201).json({ success: true, featuredProjects });
  } catch (error) {
    console.log("get featured projects: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Project
export const updateProject = async (req, res) => {
  const tempFilePath = req.files?.image?.[0]?.path;
  try {
    const { id } = req.params;
    const { title, description, liveLink, githubRepo, tags, featured } =
      req.body;
    const newImage = req.files && req.files.image && req.files.image[0];

    // Find the existing project
    const project = await Project.findById(id);
    if (!project) {
      if (tempFilePath && fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    let imageUrl = project.image; // Start with the existing image URL

    // Handle New Image Upload (if a file was provided)
    if (newImage) {
      try {
        // Upload new image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(newImage.path, {
          resource_type: "image",
          folder: "projects",
        });
        imageUrl = uploadResult.secure_url;

        // OPTIONAL TO-DO: Delete the OLD image from Cloudinary here to save storage.
      } catch (uploadError) {
        console.error("Cloudinary upload failed during update:", uploadError);
        return res
          .status(500)
          .json({ success: false, message: "New image upload failed." });
      } finally {
        // Clean up the temporary file created by Multer
        if (tempFilePath && fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
      }
    }

    let parsedTags = [];
    try {
      parsedTags = JSON.parse(tags);
    } catch (e) {
      parsedTags = tags ? tags.split(" ") : [];
    }

    const updateData = {
      title,
      description,
      liveLink,
      githubRepo,
      tags: parsedTags,
      featured: featured === "true", // Convert string 'true'/'false' to boolean
      image: imageUrl,
    };

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      project: updatedProject,
    });
  } catch (error) {
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    console.log("update project error: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found!" });

    const result = await Project.findByIdAndDelete(id);
    if (!result)
      return res.status(404).json({
        success: false,
        message: "Project not found or already deleted",
      });

    // Delete the image from Cloudinary
    if (project.image) {
      const publicId = extractPublicIdFromUrl(project.image);

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully." });
  } catch (error) {
    console.log("delete project error: ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Project details
export const getProjectDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project)
      return res
        .status(404)
        .json({ success: false, message: "Project not found!" });

    return res.status(201).json({ success: true, project });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
