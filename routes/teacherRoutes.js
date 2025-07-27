const express = require("express");
const router = express.Router();
const { readJSON } = require("../utils/fileHandler");
const path = require("path");
const lecturesPath = path.join(__dirname, "../storedData/lectures.txt");

router.get("/teacher/:username", async (req, res) => {
  const username = req.params.username;
  const lectures = (await readJSON(lecturesPath)) || [];
  const teacherLectures = lectures.filter((l) => l.teacher === username) || [];
  if (teacherLectures.length === 0) {
    return res.status(404).json({ message: "No lectures found for teacher" });
  }
  for (let i = 0; i < lectures.length; i++) {
    const endTime = lectures[i].endTime;
    const now = new Date();

    // Parse endTime as today's date with given time
    const [endHour, endMinute] = endTime.split(":").map(Number);
    const endDate = new Date(now);
    endDate.setHours(endHour, endMinute, 0, 0);
    if (endDate <= now) {
      lectures[i].isDone = true;
    }
  }
  const done = teacherLectures.filter((l) => l.isDone == true) || [];
  const obj = {
    totalLectures: teacherLectures.length || 0,
    totalDone: done.length || 0,
    totalLeft: teacherLectures.length - done.length || 0,
  };
  const responseData = {
    lectures: teacherLectures,
    metadata: obj,
  };
  res.status(200).json({ responseData });
});

module.exports = router;
