const express = require("express");
const router = express.Router();
const { readJSON } = require("../utils/fileHandler");
const path = require("path");

const lecturesPath = path.join(__dirname, "../storedData/lectures.json");

router.get("/teacher/:username", async (req, res) => {
  const username = req.params.username;
  const lectures = (await readJSON(lecturesPath)) || [];
  const teacherLectures = lectures.filter((l) => l.teacher === username);

  if (teacherLectures.length === 0) {
    return res.status(404).json({ message: "No lectures found for teacher" });
  }

  res.status(200).json({ lectures: teacherLectures });
});

module.exports = router;
