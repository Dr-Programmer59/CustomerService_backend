const express=require("express");
const { model, models } = require("mongoose");
const cors= require('cors')
const app=express();
const errorMiddleware=require("./middleware/error")
const cookieParser=require("cookie-parser")

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Include cookies in CORS requests if needed
  }));
  
app.use(express.json())
app.use(cookieParser())
// Route imports


const user=require("./routes/userRoute")
const category=require("./routes/categoryRoutes")
const audioR=require("./routes/audioRoutes.js")
const accountR=require("./routes/accountRoutes.js")

//middler ware for error


app.use("/api/v1",user)
app.use("/api/v1",category)
app.use("/api/v1",audioR)
app.use("/api/v1",accountR)


app.use(errorMiddleware)




module.exports=app;
