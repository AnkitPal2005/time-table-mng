const path = require("path");
const { readJSON } = require("../utils/fileHandler");
const userpath = path.join(__dirname, "../storedData/user.txt");
async function getAllTeachers(req, res) {
  try {
    const data = (await readJSON(userpath)) || [];
    const teachers = data.filter((user) => user.role === "teacher");
    console.log(teachers);
    res.status(200).json({ teachers });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching teachers" });
  }
}
module.exports = { getAllTeachers };
