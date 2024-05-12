const mongoose=require("mongoose")


const categorySchema=mongoose.Schema({
    name:{
        type:String, 
        required:[true,"Please Enter your name"],
        maxLength:[30,"Name cannot exceed from 30 characters"],
        minLength:[4,"Name should be more then 4 characters"]
    },
  
    description:{
        type:String, 
        required:[true,"Please Enter your name"],
       
    }

})

module.exports=mongoose.model("Category",categorySchema);