const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const { getAllTeachers } = require("./controllers/teachercontroller");
const teacherRoutes = require("./routes/teacherRoutes");
const app = express();
const pagesRouter = require("./routes/pagesRoutes");
const { clearLecture } = require("./controllers/lecturecontroller");

app.use(
  session({
    secret: "Ankitankit",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.use(
  cors({
    credentials: true,
  })
);
app.use(express.json());
app.use(
  "/",
  (req, res, next) => {
    console.log(req.url);
    next();
  },
  express.static(path.join(__dirname, "public"))
);
app.use(
  "/views",
  (req, res, next) => {
    if (req.session.user) {
      return next();
    }
    return res.status(401).json({ err: "unauthorised error" });
  },
  pagesRouter
);
app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes);
app.get("/test", (req, res) => {
  res.send("Server is working!");
});
app.use("/", async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "./public/login.html"));
  } catch {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// setInterval(()=>{
//   clearLecture()
// },1000)
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
