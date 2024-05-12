const userMessages=require("../models/userMessagesModel")
const  AsyncErrorHandler=require("../middleware/AsyncErrorHandler")
const ErrorHandler=require("../utils/errorhandler")
const sendToken=require("../utils/jwtToken")
const sendEmail=require("../utils/sendEmails")
const crypto=require("crypto")



exports.getAlluserMessages=AsyncErrorHandler(async (req,res,next)=>{
    console.log("in me")
    
    const messages=await userMessages.find();
    res.status(200).json(
        {
            sucess:true,
            messages,
        }
    )
})


exports.createuserMessages=AsyncErrorHandler(async(req,res)=>{
  
    const {employeeId}=req.body;

    const userMessage= await userMessages.create({
        employeeId,customers:new Map([
        ])
    })
   
    if(!userMessage){
        return next(new ErrorHandler("Not Created",401));
       
    }
    res.status(200).json({
        sucess:true,
        msg:"userMessages Created Scuessfully!"
    })
})

exports.updateuserMessages=AsyncErrorHandler(async(req,res,next)=>{

    const newuserMessagesData={
        name:req.body.name,
        description:req.body.description
    };
    const userMessages=await userMessages.findByIdAndUpdate(req.params.id,newuserMessagesData);
    if(!userMessages){
        console.log("something goes wrong")
    }
    res.status(200).json({
        sucess:true,
    
    })

})
exports.deleteuserMessages=AsyncErrorHandler(async(req,res,next)=>{
    const userMessages=await userMessages.findById(req.params.id);
    if(!userMessages){
        return next(new ErrorHandler("userMessages not found",404))
    }
    await userMessages.deleteOne(userMessages);
    res.status(200).json({
        sucess:true,
        msg:"userMessages Deleted Sucessfully"
    })
})