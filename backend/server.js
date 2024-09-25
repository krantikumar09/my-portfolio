const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const projectRoute = require("./routes/projectRoute");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5100;

// connect to mongodb
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/projects", projectRoute);

// start the server
app.listen(PORT, () => {
  console.log(`Server running on : http://localhost:${PORT}`);
});
