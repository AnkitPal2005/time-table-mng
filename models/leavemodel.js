const mongoose=require("mongoose");
const leaveSchema=new mongoose.Schema({
    day:{
        type:String,
        required:true
    },
    teacher:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
        }
})
module.exports=mongoose.model("Leaves",leaveSchema);