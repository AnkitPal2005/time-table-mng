const fs = require("fs");
const path = require("path");
const userfile = path.join(__dirname, "../storedData/lectures.txt");
const { readJSON, writeJSON } = require("../utils/fileHandler");
const lecturemodel = require("../models/lecturemodel");
async function addlecture(req, res) {
  try {
    const { teacher, subject, room, day, period, startTime, endTime } =
      req.body;
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
    const lectures = await lecturemodel.find({
      teacher: teacher,
      day:day,
      period:period,
      startTime:startTime,
      endTime:endTime
    });

    console.log(lectures, "bgvjerbjl");
    if (lectures.length != 0 || !lectures) {
      return res
        .status(400)
        .json({ message: "Lecture already exists for this time" });
    }

    const lecture = new lecturemodel({
      day:day.toLowerCase(),
      subject,
      teacher,
      room,
      period,
      startTime,
      endTime,
      isDone: false,
    });
    await lecture.save();
    console.log(lectures, "lectures hai ", lecture);
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
    // const lectures = (await readJSON(userfile)) || [];
    const lectures = await lecturemodel.find({ teacher: teacher });
    // const filteredLectures = lectures.filter((l) => l.teacher === teacher);
    console.log(lectures,"hare krishna");


    res.status(200).json({lectures});
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
    // const lecture = (await readJSON(userfile)) || [];
    const lecture = await lecturemodel.find({ teacher: username });
    console.log(lecture);

    // const filteredLecture = lecture.filter((l) => l.teacher === username);
    res.status(200).json(lecture);
  } catch (error) {
    console.error("something went wrong", error);
    return res.status(500).json({ message: "server Error" });
  }
}

async function clearLecture() {
  try {
    // const lecture = (await readJSON(userfile)) || [];
    const lecture = await lecturemodel.find();
    console.log(lecture);
    if (lecture.length == 0) return;
    for (let i = 0; i < lecture.length; i++) {
      const endTime = lecture[i].endTime;
      const now = new Date();

      const [endHour, endMinute] = endTime.split(":").map(Number);
      const endDate = new Date(now);
      endDate.setHours(endHour, endMinute, 0, 0);
      if (endDate <= now) {
        lecture.isDone = true;
      }
    }

  } catch (error) {
    console.log(error);
  }
}

module.exports = { addlecture, showdata, getLectureByTeacher, clearLecture };
