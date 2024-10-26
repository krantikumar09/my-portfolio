require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const projectRoute = require("./routes/projectRoute");

const app = express();
const PORT = process.env.PORT || 5100;

app.use(cors());

// connect to db
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// routes
app.use("/api/project", projectRoute);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running...`);
});
