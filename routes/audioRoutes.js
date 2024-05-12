const express=require("express")
const {isAuthenticatedUser,isAuthorizeRole}=require("../middleware/auth");
const { getAllCatgegory, deleteCategory, createCategory, updateCategory } = require("../controllers/categoryController");
const {getaudio } = require("../controllers/audioController");
const router=express.Router();

router.route("/audio").post(getaudio);
module.exports=router;
