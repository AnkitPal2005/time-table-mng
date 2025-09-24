const express=require("express");
const router=express.Router();
const Otp=require("../models/Otp");
const nodemailer=require("nodemailer");
router.post("/send-otp",async(req,res)=>{
    try{
        const {email}=req.body;
        if(!email) return res.status(400).json({message:"Email is Required"});
        const otp=Math.floor(100000+Math.random()*900000).toString();
        const otpExpiry=new Date(Date.now()+5*60*1000);
        await Otp.create({email,otp,otpExpiry});
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "ap70232789@gmail.com",
            pass: "hawm azon vwss tbzw",
          },
        });
        await transporter.sendMail({
            from:"ap70232789@gmail.com",
            to:email,
            subject:"Your OTP is here",
            text:`Your OTP is ${otp}. Valid For 5 minutes.`
        }); 
        res.json({message:"OTP Sent Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"server Error"});
    }
});
router.post("/verify-otp",async(req,res)=>{
    try{
        const {email,otp}=req.body;
        if(!email || !otp) return res.status(400).json({message:"Email and Otp are Required"});
        const otpData=await Otp.findOne({email:email,otp:otp});
        if(!otpData) return res.status(400).json({message:"Invalid OTP"});
        await Otp.deleteOne({email:email,otp:otp});
        res.json({message:"OTP Verified Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Server Error"});
    }
})
module.exports=router;
