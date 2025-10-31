const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

// Import routes with error handling
try {
  var authRoutes = require("./routes/auth");
  var otpRoutes = require("./routes/OtpRoutes");
  var resetPasswordRoute = require("./routes/reset-password");
  console.log("✅ All routes loaded successfully");
} catch (error) {
  console.error("❌ Error loading routes:", error);
  process.exit(1);
}
require("dotenv").config();
const { clearLecture } = require("./controllers/lecturecontroller");

const app = express();

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
    await mongoose.connect(`${mongoUrl}/timetablesync`);
    console.log("✅ Connected to MongoDB database");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

connectDB();

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "ScheduleSync-Secret-Key-2024",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
    },
    name: 'schedulesync.sid'
  })
);

// Enable CORS with credentials (secure configuration)
app.use(
  cors({
    credentials: true,
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://yourdomain.com'] // Replace with your production domain
      : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parser middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Custom routes (before static files to override)
// Root route serving login page
app.get("/", (req, res) => {
  try {
    console.log("Root route accessed");
    res.sendFile(path.join(__dirname, "public/login.html"));
  } catch (error) {
    console.error("Root route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Direct login route
app.get("/login.html", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public/login.html"));
  } catch (error) {
    console.error("Login route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Signup page
app.get("/signup.html", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public/signup.html"));
  } catch (error) {
    console.error("Signup route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Forgot password page
app.get("/forgotpassword.html", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public/forgotpassword.html"));
  } catch (error) {
    console.error("Forgot password route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Reset password page
app.get("/reset-password.html", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public/reset-password.html"));
  } catch (error) {
    console.error("Reset password route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve static files (after custom routes)
app.use(express.static(path.join(__dirname, "public")));

// Fast admin and dashboard routes
app.get("/views/admin.html", (req, res) => {
  try {
    if (req.session && req.session.user && req.session.user.role === "admin") {
      console.log("Admin accessing admin panel:", req.session.user);
      return res.sendFile(path.join(__dirname, "views/admin.html"));
    }
    return res.status(401).json({ error: "Unauthorized. Admin access required." });
  } catch (error) {
    console.error("Admin route error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/views/dashboard.html", (req, res) => {
  try {
    console.log("Dashboard access attempt:", req.session?.user);
    if (req.session && req.session.user && req.session.user.role === "teacher") {
      return res.sendFile(path.join(__dirname, "views/dashboard.html"));
    }
    return res.status(401).json({ error: "Unauthorized. Teacher access required." });
  } catch (error) {
    console.error("Dashboard route error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Static files for views (CSS, JS)
app.use("/views/css", express.static(path.join(__dirname, "public/css")));
app.use("/views/js", express.static(path.join(__dirname, "views/js")));

// Route to get current session user info
app.get("/api/getsession", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  return res.status(200).json(req.session.user);
});

// Routes with logging
app.use("/api/auth", (req, res, next) => {
  console.log(`Auth route: ${req.method} ${req.url}`);
  next();
}, authRoutes);

app.use("/otp", (req, res, next) => {
  console.log(`OTP route: ${req.method} ${req.url}`);
  next();
}, otpRoutes);

app.use("/api", (req, res, next) => {
  console.log(`API route: ${req.method} ${req.url}`);
  next();
}, resetPasswordRoute);

// Simple test route
app.get("/test", (req, res) => {
  res.json({ 
    message: "✅ ScheduleSync Server is working!", 
    timestamp: new Date().toISOString(),
    status: "healthy"
  });
});

// Original login page (with full CSS)
app.get("/original-login.html", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public/login.html"));
  } catch (error) {
    console.error("Original login route error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    database: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ 
    message: "Something went wrong!", 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler for API routes only
app.use('/api', (req, res, next) => {
  if (req.url.startsWith('/api/')) {
    res.status(404).json({ message: "API route not found" });
  } else {
    next();
  }
});

// 404 handler for other routes
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Route not found" });
});

// Optional: clear lecture function running every second (commented out)
// setInterval(() => {
//   clearLecture();
// }, 1000);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 ScheduleSync Server running at http://localhost:${PORT}`);
  console.log(`📅 Login Page: http://localhost:${PORT}`);
  console.log(`🔧 Test Route: http://localhost:${PORT}/test`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log(`📊 Admin Panel: http://localhost:${PORT}/views/admin.html`);
  console.log(`👨‍🏫 Teacher Dashboard: http://localhost:${PORT}/views/dashboard.html`);
  console.log('\n📋 Available API Routes:');
  console.log('- POST /api/auth/login');
  console.log('- POST /api/auth/signup');
  console.log('- POST /api/auth/logout');
  console.log('- GET /api/auth/teachers');
  console.log('- GET /api/getsession');
});
