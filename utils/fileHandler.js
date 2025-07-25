const fs = require("fs/promises");

async function readJSON(filename) {
  try {
    const data =await fs.readFile(filename, "utf8");
    return JSON.parse(data || "[]"); 
  } catch (err) {
    console.error("Error reading file:", err);
    return []; 
  }
}

async function writeJSON(filename, data) {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2), "utf8"); 
  } catch (err) {
    console.error("Error writing file:", err);
  }
}

async (params) => {
  console.log("hello")
}
module.exports = { readJSON, writeJSON };
