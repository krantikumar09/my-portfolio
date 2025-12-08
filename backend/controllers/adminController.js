import jwt from "jsonwebtoken";

// admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
      res.json({ success: true, token, message: "Admin logged in!" });
    } else {
      res.json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    console.log("Admin: ", error);
    res.json({ success: false, message: "Something went wrong!" });
  }
};
