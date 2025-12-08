import dotenv from "dotenv";
import e from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";
dotenv.config();

const app = e();

const PORT = process.env.PORT || 5100;

// Middleware
app.use(e.json());
app.use(cors());
connectDB();

// Routes
app.use("/api/auth", adminRoutes);
app.use("/api/project", projectsRoutes);

app.get('/', (req, res) => {
  res.send("API Working...");
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT: http://localhost:${PORT}`)
})