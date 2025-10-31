


// const express=require("express");
// const router=express.Router();
// const bcrypt = require("bcrypt");
// const userModel = require("../models/usermodel");
// const Otp = require("../models/Otp");
// router.post("/reset-password",async(req,res)=>{
//     try{
//         const {email,otp,newpassword}=req.body;
//         if(!email||!otp||!newpassword){
//             return res.status(400).json({message:"Please fill all the fields"});
//         }
//         const otpRecord=await Otp.findOne({email:email,otp:otp});
//         if(!otpRecord){
//             return res.status(400).json({message:"Invalid OTP"});
//         }
//         if(otpRecord.otpExpiry<new Date()){
//             await Otp.deleteOne({_id:otpRecord._id});
//             return res.status(400).json({message:"OTP has expired"});
//         }
//         const hashedPassword=await bcrypt.hash(newpassword,10);
//         const user=await userModel.findOneAndUpdate(
//             {email:email},
//             {password:hashedPassword},
//             {new:true}
//         );
//         if(!user){
//             return res.status(400).json({message:"User not found"});
//         }
//         await Otp.deleteOne({_id:otpRecord._id});
//         return res.status(200).json({message:"Password reset successfully"});
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).json({message:"server error"});
//     }
// })
// module.exports=router;



const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/usermodel");

router.post("/reset-password", async (req, res) => {
  try {
    const { newPassword } = req.body; // ✅ only newPassword

    if (!newPassword) {
      return res.status(400).json({ message: "Please enter a new password" });
    }

    // ⚠️ yahan user identify karne ka tarika zaroori hai
    // Example: agar user session me hai (req.user se), tab uska email use karo
    const email = req.user?.email; // assume login/session/jwt se aa raha hai

    if (!email) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await userModel.findOneAndUpdate(
      { email: email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
