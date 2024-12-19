const express = require("express");
const { adminLogin } = require("../controllers/adminController");

const adminRoute = express.Router();

adminRoute.post("/admin", adminLogin);

module.exports = adminRoute;
