const fs = require("fs");
const path = require("path");
const userfile = path.join(__dirname, "../storedData/lectures.json");
const { readJSON, writeJSON } = require("../utils/fileHandler");
async function addlecture(req, res) {
  try {
    const { teacher, subject, room, day, period, startTime, endTime } =
      req.body;
    console.log(req.body);
    if (
      !teacher | !subject ||
      !room ||
      !day ||
      !period ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const lectures = (await readJSON(userfile)) || [];
    if (
      lectures.find(
        (l) => l.day === day && l.room === room && l.period === period
      )
    ) {
      return res
        .status(400)
        .json({ message: "Lecture already exists for this time" });
    }
    lectures.push({ day, subject, teacher, room, period, startTime, endTime });
    console.log(lectures, "lectures hai ", userfile);
    writeJSON(userfile, lectures);
    res.status(201).json({ message: "Lecture added successfully" });
  } catch (err) {
    console.error("something went wrong", err);
    return res.status(500).json({ message: "server Error" });
  }
}

async function showdata(req, res) {
  try {
    const teacher = req.params.teacher;
    console.log(teacher);
    const lectures = (await readJSON(userfile)) || [];
    const filteredLectures = lectures.filter((l) => l.teacher === teacher);

    res.status(200).json(filteredLectures);
  } catch (err) {
    console.error("something went wrong", err);
    return res.status(500).json({ message: "server Error" });
  }
}
async function getLectureByTeacher(req, res) {
  try {
    const username = req.params.username;
    console.log(username);
    if (!username) {
      return res.status(400).json({ message: "username is required" });
    }
    const lecture = (await readJSON(userfile)) || [];
    const filteredLecture = lecture.filter((l) => l.teacher === username);
    res.status(200).json(filteredLecture);
  } catch (error) {
    console.error("something went wrong", error);
    return res.status(500).json({ message: "server Error" });
  }
}
module.exports = { addlecture, showdata, getLectureByTeacher };
