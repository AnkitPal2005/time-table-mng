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
    console.log(req.body)
   const leaves = new leavemodel({
    day:leave.day,
    teacher:leave.username,
    reason:leave.reason,
    status:'pending'
   })
   await leaves.save()
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
    const leaves = await leavemodel.find() || [];
    if(leaves.length==0){
          res.status(404).json({ message: "no leaves found" });

    };

  let arr = []
    for(const res of leaves){
      arr.push({
        username:res.teacher,
        day:res.day,
        reason:res.reason,
        status:res.status
      })
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
      teacher:username,
      day:day,
    })
    // let teacher = await lecturemodel.find({
    //   day,
    //   $ne:{
    //     startTime,endTime
    //   }
    // })
    // const arr = [leaves[0].teacher]
    // const Allteachers=usermodel.find()
    res.status(200).json({ message: "Leave adjusted successfully",lectures:leaves });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error adjusting leave" });
  }
}
async function approveLeave(req, res) {
  try {
    const { username, day,status } = req.body;
   const updateLeave = await leavemodel.findOneAndUpdate(
     { teacher: username, day: day, status: "pending" },
     {
       $set: {
         status: "Approve MOJ MAR",
       },
     },
     {new:true}
   );
   console.log(updateLeave)
      if (!updateLeave) {
        return res.status(400).json({ message: "Leave request not found" });
      }
    res.status(200).json({ message: "Leave approved successfully" });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error approving leave" });
  }
}

async function rejectedLeave(req, res) {
  try {
    const { username, day, status } = req.body;
    const updateLeave =await leavemodel.findOneAndUpdate({teacher:username,day:day,status:'pending'},{
      $set:{
        status:'rejected',
      }
    },{new:true})
    if (!updateLeave) {
      return res.status(404).json({ message: "Leave request not found" });
    }
    res.status(200).json({ message: "Leave reject successfully" ,updateLeave});
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
