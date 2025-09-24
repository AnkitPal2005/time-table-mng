// const fs = require("fs");
// const path = require("path");
// const userfile = path.join(__dirname, "../storedData/leave.txt");
// const lecturesFile = path.join(__dirname, "../storedData/lectures.txt");

// const { readJSON, writeJSON } = require("../utils/fileHandler");
// const leavemodel = require("../models/leavemodel");
// const lecturemodel = require("../models/lecturemodel");
// const usermodel = require("../models/usermodel");
// async function requestLeave(req, res) {
//   try {
//     const leave = req.body;
//     console.log(req.body);
//     const leaves = new leavemodel({
//       day: leave.day,
//       teacher: leave.username,
//       reason: leave.reason,
//       status: "pending",
//     });
//     await leaves.save();
//     res.status(200).json({ message: "leave request submited successfully" });
//   } catch (err) {
//     console.log(err);
//     res
//       .status(500)
//       .json({ message: "something went wrong in submitting leave" });
//   }
// }
// async function readleave(req, res) {
//   try {
//     const leaves = (await leavemodel.find()) || [];
//     if (leaves.length == 0) {
//       res.status(404).json({ message: "no leaves found" });
//     }

//     let arr = [];
//     for (const res of leaves) {
//       arr.push({
//         username: res.teacher,
//         day: res.day,
//         reason: res.reason,
//         status: res.status,
//       });
//     }
//     res.status(200).json(arr);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "something went wrong" });
//   }
// }
// // async function adjustLeave(req, res) {
// //   try {
// //     const { username, day } = req.body;
// //     let leaves = await lecturemodel.find({
// //       teacher:username,
// //       day:day,
// //     })

// //     res.status(200).json({ message: "Leave adjusted successfully",lectures:leaves });
// //   } catch (err) {
// //     console.log(err);
// //     res.status(500).json({ message: "Error adjusting leave" });
// //   }
// // }
// async function adjustLeave(req, res) {
//   try {
//     const { day,teacher,status } = req.body;
//     console.log(req.body);
//     // 1. Get all teachers

//     const allTeachers = await usermodel.find({ role: "teacher" });
//     // 2. Get teachers who are on leave that day
//     console.log(allTeachers, "teacher hai ji ");
//     const leaveTeachers = await leavemodel.find(
//       {
//         day,
//         status: { $in: ["Approve", "pending"] },
//       },
//       "teacher"
//     );

//     console.log(leaveTeachers, "leave hai ji ");
//     const leaveTeacherUsernames = leaveTeachers.map((l) => l.teacher);
//     console.log(leaveTeacherUsernames, "leave teacher hai ji ");

//     // 4. Filter teachers who are NOT on leave and NOT busy
//     const availableTeachers = allTeachers.filter(
//       (t) =>
//         !leaveTeacherUsernames.includes(t.username) &&
//         !busyTeacherUsernames.includes(t.username)
//     );

//     // 5. Calculate load for each available teacher
//     const teacherLoads = {};
//     for (const teacher of availableTeachers) {
//       teacherLoads[teacher.username] = await lecturemodel.countDocuments({
//         teacher: teacher.username,
//       });
//     }

//     // 6. Sort teachers by load (ascending)
//     const sortedTeachers = availableTeachers.sort(
//       (a, b) => teacherLoads[a.username] - teacherLoads[b.username]
//     );
//     console.log(sortedTeachers, "oo  bhai ");
//     // 7. Send lectures and available teachers
//     res.status(200).json({
//       lectures: await lecturemodel.find({ day }),
//       availableTeachers: sortedTeachers,
//       load: sortedTeachers.map((t) => ({
//         username: t.username,
//         load: teacherLoads[t.username],
//       })),
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error adjusting leave" });
//   }
// }

// async function approveLeave(req, res) {
//   try {
//     const { username, day, status } = req.body;
//     const updateLeave = await leavemodel.findOneAndUpdate(
//       { teacher: username, day: day, status: "pending" },
//       {
//         $set: {
//           status: "Approve",
//         },
//       },
//       { new: true }
//     );
//     console.log(updateLeave);
//     if (!updateLeave) {
//       return res.status(400).json({ message: "Leave request not found" });
//     }
//     res.status(200).json({ message: "Leave approved successfully" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error approving leave" });
//   }
// }

// async function rejectedLeave(req, res) {
//   try {
//     const { username, day, status } = req.body;
//     const updateLeave = await leavemodel.findOneAndUpdate(
//       { teacher: username, day: day, status: "pending" },
//       {
//         $set: {
//           status: "rejected",
//         },
//       },
//       { new: true }
//     );
//     if (!updateLeave) {
//       return res.status(404).json({ message: "Leave request not found" });
//     }
//     res.status(200).json({ message: "Leave reject successfully", updateLeave });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Error reject leave" });
//   }
// }
// module.exports = {
//   requestLeave,
//   readleave,
//   adjustLeave,
//   approveLeave,
//   rejectedLeave,
// };
const fs = require("fs");
const path = require("path");
const userfile = path.join(__dirname, "../storedData/leave.txt");
const lecturesFile = path.join(__dirname, "../storedData/lectures.txt");

const { readJSON, writeJSON } = require("../utils/fileHandler");
const leavemodel = require("../models/leavemodel");
const lecturemodel = require("../models/lecturemodel");
const usermodel = require("../models/usermodel");
async function requestLeave(req, res) {
  try {
    const leave = req.body;
    console.log(req.body);
    const leaves = new leavemodel({
      day: leave.day,
      teacher: leave.username,
      reason: leave.reason,
      status: "pending",
    });
    await leaves.save();
    res.status(200).json({ message: "leave request submited successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "something went wrong in submitting leave" });
  }
}
async function readleave(req, res) {
  try {
    const leaves = (await leavemodel.find()) || [];
    if (leaves.length == 0) {
      res.status(404).json({ message: "no leaves found" });
    }
    console.log(leaves,"lolololololololooloolpoololllololololololollolololol")
    let arr = [];
    for (const res of leaves) {
      arr.push({
        username: res.teacher,
        day: res.day,
        reason: res.reason,
        status: res.status,
      });
    }
    res.status(200).json(arr);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
}
async function adjustLeave(req, res) {
  try {
    const { username, day } = req.body;
    let leaves = await lecturemodel.find({
      teacher: username,
      day: day,
    });

    res
      .status(200)
      .json({ message: "Leave adjusted successfully", lectures: leaves });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adjusting leave" });
  }
}
async function approveLeave(req, res) {
  try {
    const { username, day, status } = req.body;
    const updateLeave = await leavemodel.findOneAndUpdate(
      { teacher: username, day: day, status: "pending" },
      {
        $set: {
          status: "Approve",
        },
      },
      { new: true }
    );
    console.log(updateLeave);
    if (!updateLeave) {
      return res.status(400).json({ message: "Leave request not found" });
    }
    res.status(200).json({ message: "Leave approved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error approving leave" });
  }
}

async function rejectedLeave(req, res) {
  try {
    const { username, day, status } = req.body;
    const updateLeave = await leavemodel.findOneAndUpdate(
      { teacher: username, day: day, status: "pending" },
      {
        $set: {
          status: "rejected",
        },
      },
      { new: true }
    );
    if (!updateLeave) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    res.status(200).json({ message: "Leave reject successfully", updateLeave });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error reject leave" });
  }
}
module.exports = {
  requestLeave,
  readleave,
  adjustLeave,
  approveLeave,
  rejectedLeave,
};