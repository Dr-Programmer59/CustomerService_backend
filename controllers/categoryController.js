const Category=require("../models/categoryModel")
const  AsyncErrorHandler=require("../middleware/AsyncErrorHandler")
const ErrorHandler=require("../utils/errorhandler")
const sendToken=require("../utils/jwtToken")
const sendEmail=require("../utils/sendEmails")
const crypto=require("crypto")



exports.getAllCatgegory=AsyncErrorHandler(async (req,res,next)=>{
    console.log("in me")
    
    const categories=await Category.find();
    res.status(200).json(
        {
            sucess:true,
            categories,
        }
    )
})


exports.createCategory=AsyncErrorHandler(async(req,res)=>{
  
    const {name,description}=req.body;

    const category= await Category.create({
        name,description
    })
   
    if(!category){
        return next(new ErrorHandler("Not Created",401));
       
    }
    res.status(200).json({
        sucess:true,
        msg:"category Created Scuessfully!"
    })
})

exports.updateCategory=AsyncErrorHandler(async(req,res,next)=>{

    const newCategoryData={
        name:req.body.name,
        description:req.body.description
    };
    const category=await Category.findByIdAndUpdate(req.params.id,newCategoryData);
    if(!category){
        console.log("something goes wrong")
    }
    res.status(200).json({
        sucess:true,
    
    })

})
exports.deleteCategory=AsyncErrorHandler(async(req,res,next)=>{
    const category=await Category.findById(req.params.id);
    if(!category){
        return next(new ErrorHandler("Category not found",404))
    }
    await Category.deleteOne(category);
    res.status(200).json({
        sucess:true,
        msg:"category Deleted Sucessfully"
    })
})