const mongoose = require("mongoose");
const lectureSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  adjustedteacher:{
    type:String,
    default:""
  },
});
module.exports=mongoose.model("Lectures",lectureSchema);
