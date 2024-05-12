const mongoose=require("mongoose")


const accountSchema=mongoose.Schema({
    symbol:{
        type:String, 
        required:[true,"Please Enter your account"]
    },
    account:{
        type:String, 
        required:[true,"Please Enter your account"]
    },
     
  
    holdername:{
        type:String, 
        required:[true,"Please Enter your name"]
       
    },

   accountnumber:{
        type:String, 
        required:[true,"Please Enter your accountnumber"],
       
    }
})

module.exports=mongoose.model("bankdetails",accountSchema);