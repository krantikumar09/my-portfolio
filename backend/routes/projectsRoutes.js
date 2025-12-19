import e from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getFeaturedProjects,
  getProjectDetails,
  updateProject,
} from "../controllers/projectController.js";
import authMiddleware from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const projectRoutes = e.Router();

projectRoutes.get("/", getAllProjects);
projectRoutes.get("/featured", getFeaturedProjects);
projectRoutes.post(
  "/create",
  authMiddleware,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createProject
);
projectRoutes.put(
  "/update/:id",
  authMiddleware,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateProject
);
projectRoutes.delete("/delete/:id", authMiddleware, deleteProject);
projectRoutes.get("/:id", getProjectDetails);

export default projectRoutes;
