const express = require("express");
const {
  getProjects,
  createProject,
} = require("../controllers/projectController");
const adminAuth  = require("../middleware/adminAuth");
const upload = require("../middleware/multer");

const projectRoute = express.Router();

projectRoute.get("/get", getProjects);
projectRoute.post(
  "/create",
  adminAuth,
  upload.fields([{ name: "image", maxCount: 1 }]),
  (req, res, next) => {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ success: false, message: "Image is required!"});;
    }
    next();
  },
  createProject
);

module.exports = projectRoute;
