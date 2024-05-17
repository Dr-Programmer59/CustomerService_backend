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
exports.getuserMessage=AsyncErrorHandler(async (req,res,next)=>{
    console.log("in me")
   
    const message=await userMessages.findById(req.params.id);
    res.status(200).json(
        {
            sucess:true,
            message,
        }
    )
})


exports.createuserMessages=AsyncErrorHandler(async(req,res)=>{
  
  

    const userMessage= await userMessages.create({
        _id:req.params.id,customers:{}
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

    try {
        const {customerId,customerName,message}=req.body;

        const employee = await userMessages.findById(req.params.id);
        
        if (!employee) {
            console.log('Employee not found');
            return null;
        }
        console.log("trying to updating")
        await employee.addMessageToCustomer(customerId,customerName, message);
        // Check if customer ID exists in the customers object
     
        // Save the updated employee document
     
        
    } catch (error) {
        console.error('Error updating customer messages:', error);
        throw error;
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