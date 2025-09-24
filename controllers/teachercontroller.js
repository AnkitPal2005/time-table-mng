// const path = require("path");
// const { readJSON } = require("../utils/fileHandler");
// const usermodel = require("../models/usermodel");
// const userpath = path.join(__dirname, "../storedData/user.txt");
// async function getAllTeachers(req, res) {
//   try {
//     // const data = (await readJSON(userpath)) || [];
//     // const teachers = data.filter((user) => user.role === "teacher");
//     const teachers=await usermodel.find();
//     console.log(teachers);
//     const response = [];
//     for(const teacher of teachers){
//       response.push({
//         id:teacher._id,
//         username:teacher.username,
//       })
//     }
//     res.status(200).json({ teachers :response});
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ message: "Error fetching teachers" });
//   }
// }
// module.exports = { getAllTeachers };
const path = require("path");
const { readJSON } = require("../utils/fileHandler");
const usermodel = require("../models/usermodel");
const userpath = path.join(__dirname, "../storedData/user.txt");
async function getAllTeachers(req, res) {
  try {
    // const data = (await readJSON(userpath)) || [];
    // const teachers = data.filter((user) => user.role === "teacher");
    const teachers = await usermodel.find();
    console.log(teachers);
    const response = [];
    for (const teacher of teachers) {
      response.push({
        id: teacher._id,
        username: teacher.username,
      });
    }
    res.status(200).json({ teachers: response });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching teachers" });
  }
}
module.exports = { getAllTeachers };