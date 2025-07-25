const express = require("express");
const path = require("path");
const router = express.Router();

router.use("/css", (req, res) => {
  return res.sendFile(path.join(__dirname, "../", "/views", "/css/style.css"));
});
router.use("/js", (req, res) => {
  return res.sendFile(path.join(__dirname, "../", "/views/js", req.url));
});

router.get("/admin.html", (req, res) => {
  if (req.session.user.role == "admin") {
    console.log(req.session);
    return res.sendFile(path.join(__dirname, "../", "/views", "admin.html"));
  }
  return res.status(401).json({ err: "Aise Kaise Access Karlega Admin Hai Kya" });
});

router.get("dashbaord.html", () => {});

router.get("/teacher.html", (req, res, next) => {
  if (req.session.user.role == "teacher") {
    return res.sendFile(path.join(__dirname, "../", "/views", "teacher.html"));
  }

  return res.status(401).json({ err: "unauthorised" });
});
module.exports = router;
