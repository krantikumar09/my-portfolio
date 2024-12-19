const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  liveLink: { type: String, required: true },
  githubRepo: { type: String },
  featured: { type: Boolean },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
