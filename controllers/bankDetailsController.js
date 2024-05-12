const  AsyncErrorHandler=require("../middleware/AsyncErrorHandler")
const ErrorHandler=require("../utils/errorhandler")
const sendToken=require("../utils/jwtToken")
const sendEmail=require("../utils/sendEmails")
const crypto=require("crypto")

const Account=require("../models/bankDetailsModel")


exports.getAllbankdetails=AsyncErrorHandler(async (req,res,next)=>{
    console.log("in me")
    
    const accounts=await Account.find();
    res.status(200).json(
        {
            sucess:true,
            accounts,
        }
    )
})


exports.createAccountdetails=AsyncErrorHandler(async(req,res)=>{
  
    const {account,holdername,accountnumber,symbol}=req.body;

    const check= await Account.create({
        account,holdername,accountnumber,symbol
    })
   
    if(!check){
        return next(new ErrorHandler("Not Created",401));
       
    }
    res.status(200).json({
        sucess:true,
        msg:"account Created Scuessfully!"
    })
})

exports.updateAccountDetails=AsyncErrorHandler(async(req,res,next)=>{

    const newaccountdata={
        account:req.body.account,
        holdername:req.body.holdername,
        accountnumber:req.body.accountnumber,
       
    };
    const check=await Account.findByIdAndUpdate(req.params.id,newaccountdata);
    if(!check){
        console.log("something goes wrong")
    }
    res.status(200).json({
        sucess:true,
    
    })

})
exports.deleteAccountDetails=AsyncErrorHandler(async(req,res,next)=>{
    const account=await Account.findById(req.params.id);
    if(!account){
        return next(new ErrorHandler("Category not found",404))
    }
    await Account.deleteOne(account);
    res.status(200).json({
        sucess:true,
        msg:"account Deleted Sucessfully"
    })
})