const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const teacherRoutes = require("./routes/teacherRoutes");
const otpRoutes = require("./routes/OtpRoutes");
const resetPasswordRoute = require("./routes/reset-password");
const pagesRouter = require("./routes/pagesRoutes");
require("dotenv").config();
const { clearLecture } = require("./controllers/lecturecontroller");

const app = express();

// MongoDB connection
mongoose
  .connect(`${process.env.MONGO_URL}/timetablesync`, {})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Session setup
app.use(
  session({
    secret: "Ankitankit",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 1000, // 1 hour
    },
  })
);

// Enable CORS with credentials
app.use(
  cors({
    credentials: true,
    origin: true, // You can specify your frontend URL here instead of true for better security
  })
);

// Body parser middleware
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Protected views routes (only accessible if session user exists)
app.use(
  "/views",
  (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    return res.status(401).json({ error: "Unauthorized" });
  },
  pagesRouter
);

// Route to get current session user info
app.get("/getsession", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.status(200).json(req.session.user);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/otp", otpRoutes); // OTP routes with prefix
app.use("/api", resetPasswordRoute); // Reset-password route

// Simple test route
app.get("/test", (req, res) => {
  res.send("Server is working!");
});

// Root route serving login page
app.get("/", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./public/login.html"));
  } catch {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Optional: clear lecture function running every second (commented out)
// setInterval(() => {
//   clearLecture();
// }, 1000);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
