const fs = require("fs");
const path = require("path");
const userfile = path.join(__dirname, "../storedData/leave.json");

const { readJSON, writeJSON } = require("../utils/fileHandler");
async function requestLeave(req,res){
    try{
    const leave=req.body;
    const leaves = await readJSON(userfile)||[];
    leaves.push(leave);
     writeJSON(userfile,leaves);
     res.status(200).json({message:"leave request submited successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong in submitting leave"});
    }
}
async function readleave(req,res){
    try{
        const leaves = await readJSON(userfile)||[];
        res.status(200).json(leaves);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"something went wrong"});
    }
}
module.exports={requestLeave,readleave}
    