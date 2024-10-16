require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const projectRoute = require("./routes/projectRoute");

const app = express();
const PORT = process.env.PORT || 5100;

// connect to db
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// routes
app.use("/api/project", projectRoute);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
