require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const projectRoute = require("./routes/projectRoute");
const adminRoute = require("./routes/adminRoute");
const connectCloudinary = require("./config/cloudinary");

const app = express();
const PORT = process.env.PORT || 5100;

app.use(cors());
app.use(express.json());

// connect to db
connectDB();
// connect cloudinary
connectCloudinary();

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// routes
app.use("/api/project", projectRoute);
app.use("/api/user", adminRoute);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
