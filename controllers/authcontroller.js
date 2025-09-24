// const fs = require("fs");
// const path = require("path");
// const userfile = path.join(__dirname, "../storedData/user.txt");
// const user=require("../models/usermodel");
// const { readJSON, writeJSON } = require("../utils/fileHandler");
// const User = require("../models/usermodel");

// async function signupTeacher(req, res) {
//   try {
//     console.log("kya hall hai");
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ message: "All fields are required." });
//     }

//     // const users = (await readJSON("storedData/user.txt")) || [];
//     const existingUser= await User.findOne({username})

//     // if (users.find((u) => u.username === username)) {
//     //   return res.status(400).json({ message: "Username already exists." });
//     // }
//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists." });
//     }

//     // users.push({ username, password, role: "teacher" });
//     // writeJSON("storedData/user.txt", users);
//     const newUser = new User({ username, password, role: "teacher" });
//     await newUser.save();

//     res.status(201).json({ message: "Signup successful! Please login." });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// async function loginUser(req, res) {
//   const { username, password, role } = req.body;
//   console.log("kya hsksijeriughhjgehjvgtr hrgvh");
//   if (!username || !password || !role) {
//     return res.status(400).json({ message: "All fields are required." });
//   }

//   if (role === "admin") {
//     if (username === "admin" && password === "admin123") {
//       req.session.user = { username: "admin", role: "admin" };
//       req.session.save();
//       return res.status(200).json({ message: "Login successful!" });
//     } else {
//       return res.status(400).json({ message: "Invalid Admin Credentials." });
//     }
//   }
//   // const users = await readJSON("storedData/user.txt");
//   // const user = users?.find(
//   //   (u) => u.username === username && u.password === password && u.role === role
//   // );
//   // console.log(user);
//   const user=await User.findOne({username});
//   if (!user) {
//     return res.status(404).json({ message: "user not found" });
//     }
//     if (user.password !== password) {
//       return res.status(400).json({ message: "Invalid Password." });
//     }
//   if (user) {
//     req.session.user = { username: user.username, role: user.role,id:user._id };
//     return res.status(200).json({ message: `${role} Login successful!` });
//   } else {
//     return res.status(400).json({ message: "Invalid Username Or Password." });
//   }
// }
// async function logoutUser(req, res) {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error("Logout Error:", err);
//       return res.status(500).json({ message: "Logout failed!" });
//     }

//     res.clearCookie("connect.sid");
//     return res.status(200).json({ message: "Logout successful!" });
//   });
// }

// module.exports = { signupTeacher, loginUser, logoutUser };
const fs = require("fs");
const path = require("path");
const userfile = path.join(__dirname, "../storedData/user.txt");
const user = require("../models/usermodel");
const { readJSON, writeJSON } = require("../utils/fileHandler");
const User = require("../models/usermodel");

async function signupTeacher(req, res) {
  try {
    console.log("kya hall hai");
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // const users = (await readJSON("storedData/user.txt")) || [];
    const existingUser = await User.findOne({ username });

    // if (users.find((u) => u.username === username)) {
    //   return res.status(400).json({ message: "Username already exists." });
    // }
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // users.push({ username, password, role: "teacher" });
    // writeJSON("storedData/user.txt", users);
    const newUser = new User({ username, password, role: "teacher" });
    await newUser.save();

    res.status(201).json({ message: "Signup successful! Please login." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  const { username, password, role } = req.body;
  console.log("kya hsksijeriughhjgehjvgtr hrgvh");
  if (!username || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (role === "admin") {
    if (username === "admin" && password === "admin123") {
      req.session.user = { username: "admin", role: "admin" };
      req.session.save();
      return res.status(200).json({ message: "Login successful!" });
    } else {
      return res.status(400).json({ message: "Invalid Admin Credentials." });
    }
  }
  
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid Password." });
  }
  if (user) {
    req.session.user = {
      username: user.username,
      role: user.role,
      id: user._id,
    };
    return res.status(200).json({ message: `${role} Login successful!` });
  } else {
    return res.status(400).json({ message: "Invalid Username Or Password." });
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