const express=require("express");
const { model, models } = require("mongoose");
const cors= require('cors')
const app=express();
const errorMiddleware=require("./middleware/error")
const cookieParser=require("cookie-parser")
const dotenv=require("dotenv")


dotenv.config({path:"config/config.env"})
console.log(process.env.FRONTEND_EMPLOYEE," ",process.env.FRONTEND_ADMIN)
app.use(cors({
    origin: [process.env.FRONTEND_EMPLOYEE,process.env.FRONTEND_ADMIN],
    credentials: true, // Include cookies in CORS requests if needed
  }));
  
app.use(express.json())
app.use(cookieParser())
// Route imports


const user=require("./routes/userRoute")
const category=require("./routes/categoryRoutes")
const audioR=require("./routes/audioRoutes.js")
const accountR=require("./routes/accountRoutes.js")
const mesasgeR=require("./routes/userMessagesRoutes.js")
const customerR=require("./routes/customerRoute.js")

//middler ware for error


app.use("/api/v1",user)
app.use("/api/v1",category)
app.use("/api/v1",audioR)
app.use("/api/v1",accountR)
app.use("/api/v1",mesasgeR)
app.use("/api/v1",customerR)





app.use(errorMiddleware)




module.exports=app;
