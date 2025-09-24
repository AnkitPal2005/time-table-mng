// const fs = require("fs");
// const path = require("path");
// const userfile = path.join(__dirname, "../storedData/lectures.txt");
// const { readJSON, writeJSON } = require("../utils/fileHandler");
// const lecturemodel = require("../models/lecturemodel");
// async function addlecture(req, res) {
//   try {
//     const { teacher, subject, room, day, period, startTime, endTime } =
//       req.body;
//     if (
//       !teacher | !subject ||
//       !room ||
//       !day ||
//       !period ||
//       !startTime ||
//       !endTime
//     ) {
//       return res.status(400).json({ message: "Please fill all the fields" });
//     }
//     const lectures = await lecturemodel.find({
//       teacher: teacher,
//       day:day,
//       period:period,
//       startTime:startTime,
//       endTime:endTime
//     });

//     console.log(lectures, "bgvjerbjl");
//     if (lectures.length != 0 || !lectures) {
//       return res
//         .status(400)
//         .json({ message: "Lecture already exists for this time" });
//     }

//     const lecture = new lecturemodel({
//       day:day.toLowerCase(),
//       subject,
//       teacher,
//       room,
//       period,
//       startTime,
//       endTime,
//       isDone: false,
//     });
//     await lecture.save();
//     console.log(lectures, "lectures hai ", lecture);
//     res.status(201).json({ message: "Lecture added successfully" });
//   } catch (err) {
//     console.error("something went wrong", err);
//     return res.status(500).json({ message: "server Error" });
//   }
// }

// async function showdata(req, res) {
//   try {
//     const teacher = req.params.teacher;
//     console.log(teacher);
//     // const lectures = (await readJSON(userfile)) || [];
//     const lectures = await lecturemodel.find({ teacher: teacher });
//     // const filteredLectures = lectures.filter((l) => l.teacher === teacher);
//     console.log(lectures,"hare krishna");


//     res.status(200).json({lectures});
//   } catch (err) {
//     console.error("something went wrong", err);
//     return res.status(500).json({ message: "server Error" });
//   }
// }
// async function getLectureByTeacher(req, res) {
//   try {
//     const username = req.params.username;
//     console.log(username);
//     if (!username) {
//       return res.status(400).json({ message: "username is required" });
//     }
//     // const lecture = (await readJSON(userfile)) || [];
//     const lecture = await lecturemodel.find({ teacher: username });
//     console.log(lecture);

//     // const filteredLecture = lecture.filter((l) => l.teacher === username);
//     res.status(200).json(lecture);
//   } catch (error) {
//     console.error("something went wrong", error);
//     return res.status(500).json({ message: "server Error" });
//   }
// }

// async function clearLecture() {
//   try {
//     // const lecture = (await readJSON(userfile)) || [];
//     const lecture = await lecturemodel.find();
//     console.log(lecture);
//     if (lecture.length == 0) return;
//     for (let i = 0; i < lecture.length; i++) {
//       const endTime = lecture[i].endTime;
//       const now = new Date();

//       const [endHour, endMinute] = endTime.split(":").map(Number);
//       const endDate = new Date(now);
//       endDate.setHours(endHour, endMinute, 0, 0);
//       if (endDate <= now) {
//         lecture.isDone = true;
//       }
//     }

//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = { addlecture, showdata, getLectureByTeacher, clearLecture };
const fs = require("fs");
const path = require("path");
const userfile = path.join(__dirname, "../storedData/lectures.txt");
const { readJSON, writeJSON } = require("../utils/fileHandler");
const lecturemodel = require("../models/lecturemodel");
const usermodel = require("../models/usermodel");
const { error } = require("console");
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
    console.log(req.body)
    // need to fix issues
    const lectures = await lecturemodel.find({
     teacher: teacher,
     day:day.toLowerCase(),
     period:period,
      
        $and:[
          {startTime:{$lt:endTime}},
          {endTime:{$gt:startTime}}
        ]
      
     
    });



    console.log(lectures, "bgvjerbjl");
    if (lectures.length != 0 || !lectures) {

      return res
        .status(400)
        .json({ message: "Lecture already exists for this time" });
    }

    const lecture = new lecturemodel({
      day: day.toLowerCase(),
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
    console.log(lectures, "hare krishna");

    res.status(200).json({ lectures });
  } catch (err) {
    console.error("something went wrong", err);
    return res.status(500).json({ message: "server Error" });
  }
}
async function getLectureByTeacher(req, res) {
  try {
    const username=req.session.user.username;
    console.log(username,"pal hai ji");
    if (!username) {
      return res.status(400).json({ message: "username is required" });
    }
    // const lecture = (await readJSON(userfile)) || [];
    const lecture = await lecturemodel.find({ teacher: username });
    console.log(lecture);

    // const filteredLecture = lecture.filter((l) => l.teacher === username);
    res.status(200).json({lecture,username});
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
    const now=new Date();
    for (let i = 0; i < lecture.length; i++) {
      const endTime = lecture[i].endTime;
      // const now = new Date();

      const [endHour, endMinute] = endTime.split(":").map(Number);
      const endDate = new Date(now);
      endDate.setHours(endHour, endMinute, 0, 0);
      if (endDate <= now&&!lecture[i].isDone) {
        // lecture.isDone = true;
        await lecturemodel.updateOne(
          { _id: lecture[i]._id },
          { $set: { isDone: true } }
        )
      }
    }
  } catch (error) {
    console.log(error);
  }
}
async function getassignedteacher(req,res) {
  try {
    const { username, day, period,time } = req.body;

    console.log(username, day, period,time);

   console.log("Excluded Username:", username);

   const allOtherTeachers = await usermodel.find({
     username: { $ne: username },
     role: "teacher",
   });

   console.log("Filtered Teachers:", allOtherTeachers);



    console.log(allOtherTeachers);
    const availableTeachers = [];

    for (let teacher of allOtherTeachers) {
      console.log(teacher.username,"kujjuuuuuuuuu",teacher)
      const isBusy = await lecturemodel.findOne({
        teacher: teacher.username,
        day: day,
        period: period,
        startTime:time,
      });
      console.log(isBusy,"radha")
      if (!isBusy) {
        const load = await lecturemodel.countDocuments({
          teacher: teacher.username,
        });
        console.log(load)
        availableTeachers.push({
          username: teacher.username,
          load: load,
        });
      }
    }
    console.log(availableTeachers)
    res.status(200).json({ availableTeachers });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while checking availability" });
  }

}
// async function assignLecture(req,res){
//   try{
//     const {teacher, subject, room, day, period, startTime, endTime} = req.body;
//     console.log(req.body);
//    if (!teacher || !subject || !room || !day || !period || !startTime || !endTime) {
//       return res.status(400).json({ message: "Missing fields" });
//     }
//     const lecture = await lecturemodel.find({
//       teacher,
//       day:day.toLowerCase(),
//       period,
//       $or:[
//         {startTime:{$lte:endTime}},{endTime:{$gte:startTime}},
//       ],
//       });
//       if(lecture.length!==0){
//         return res.status(400).json({ message: "Teacher already assigned for this time" });
//       }
//       const newLecture = new lecturemodel({
//         teacher,
//         subject,
//         room,
//         day:day.toLowerCase(),
//         period,
//         startTime,
//         endTime,
//         isDone:false,
//       });
//       await newLecture.save();
//       res.status(201).json({ message: "Lecture assigned successfully",newLecture });
//       } catch (err) {
//       console.error("Error Assiging Lecture:",err);
//       res.status(500).json({ message: "Server error while assigning lecture" });
// }
// }
async function assignLecture(req, res) {
  try {
    const { teacher, subject, room, day, period, startTime, endTime } =
      req.body;
      console.log("assignLecture() controller hit");
    console.log("Assigning Lecture:", req.body);

    if (
      !teacher ||
      !subject ||
      !room ||
      !day ||
      !period ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const lecture = await lecturemodel.find({
      teacher,
      day: day.toLowerCase(),
      period,
      $or: [
        {
          $and: [
            { startTime: { $lt: endTime } },
            { endTime: { $gt: startTime } },
          ],
        },
      ],
    });

    if (lecture.length !== 0) {
      return res
        .status(400)
        .json({ message: "Teacher already assigned for this time" });
    }

    const newLecture = new lecturemodel({
      teacher,
      subject,
      room,
      day: day.toLowerCase(),
      period,
      startTime,
      endTime,
      isDone: false,
    });

    await newLecture.save();
    res
      .status(201)
      .json({ message: "Lecture assigned successfully", newLecture });
  } catch (err) {
    console.error("Error Assigning Lecture:", err);
    res.status(500).json({ message: "Server error while assigning lecture" });
  }
}





async function getTeacherLectureSummary(req,res){
  try{
    const username = req.params.username;
    const total=await lecturemodel.countDocuments({teacher:username});
    const done=await lecturemodel.countDocuments({teacher:username,isDone:true});
    const pending=total-done;
    res.status(200).json({total,done,pending});
}
catch(err){
  res.status(500).json({message:"server error"});
}
}

module.exports = {
  addlecture,
  showdata,
  getLectureByTeacher,
  clearLecture,
  getTeacherLectureSummary,
  getassignedteacher,
  assignLecture,
};