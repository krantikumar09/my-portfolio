const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token is not provided" });
    }

    const token = authHeader.split(" ")[1];
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = token_decode;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid or expired token!" });
  }
};

module.exports = adminAuth;
