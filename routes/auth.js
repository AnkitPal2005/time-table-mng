const express = require("express");
const router = express.Router();
const path=require("path");
const { signupTeacher,loginUser,logoutUser } = require("../controllers/authcontroller");
const { readJSON, writeJSON } = require("../utils/fileHandler");
const { getAllTeachers } = require("../controllers/teachercontroller");
const {
  addlecture,
  showdata,
  getLectureByTeacher,
  getTeacherLectureSummary,
  getassignedteacher,
  assignLecture,
} = require("../controllers/lecturecontroller");
const { requestLeave, readleave, adjustLeave,approveLeave, rejectedLeave } = require("../controllers/leavecontroller");

router.post("/signup",signupTeacher);
router.post("/login",loginUser);
router.get("/teachers",getAllTeachers);
router.post("/lectures", addlecture);
router.get("/showLectures/:teacher",showdata)
router.get("/getLectureByTeacher/teacher",getLectureByTeacher);
// Logout API
router.post('/logout', logoutUser);
router.post('/request',requestLeave);
router.post('/getlecturesleave', adjustLeave); 
router.post('/approveleave', approveLeave); 
router.post('/reject',rejectedLeave)
router.get('/leave',readleave);
router.get("/teacherLectureSummary/:username",getTeacherLectureSummary)
router.post("/assignteacher", getassignedteacher);
router.post("/assignlecture", assignLecture);

module.exports = router;






