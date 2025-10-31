
const User = require("../models/usermodel");

async function signupTeacher(req, res) {
  try {
    console.log("Signup attempt:", req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const newUser = new User({ username, password, role: "teacher" });
    await newUser.save();

    console.log("New teacher created:", username);
    res.status(201).json({ message: "Signup successful! Please login." });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password, role } = req.body;
    console.log("Login attempt:", { username, role });
    
    if (!username || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Admin login
    if (role === "admin") {
      if (username === "admin" && password === "admin123") {
        req.session.user = { username: "admin", role: "admin" };
        req.session.save((err) => {
          if (err) {
            console.error("Session save error:", err);
            return res.status(500).json({ message: "Session error" });
          }
          return res.status(200).json({ message: "Admin login successful!" });
        });
      } else {
        return res.status(400).json({ message: "Invalid admin credentials." });
      }
      return;
    }
    
    // Teacher login
    if (role === "teacher") {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid password." });
      }
      
      req.session.user = {
        username: user.username,
        role: user.role,
        id: user._id,
      };
      
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ message: "Session error" });
        }
        return res.status(200).json({ message: "Teacher login successful!" });
      });
    } else {
      return res.status(400).json({ message: "Invalid role specified." });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return res.status(500).json({ message: "Logout failed!" });
    }

    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Logout successful!" });
  });
}

module.exports = { signupTeacher, loginUser, logoutUser };