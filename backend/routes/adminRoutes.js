import e from "express";
import { adminLogin } from "../controllers/adminController.js";

const adminRoutes = e.Router();

adminRoutes.post("/login", adminLogin);

export default adminRoutes;
