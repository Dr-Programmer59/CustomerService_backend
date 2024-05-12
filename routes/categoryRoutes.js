const express=require("express")
const {isAuthenticatedUser,isAuthorizeRole}=require("../middleware/auth");
const { getAllCatgegory, deleteCategory, createCategory, updateCategory } = require("../controllers/categoryController");
const router=express.Router();

router.route("/categories").get(getAllCatgegory);
router.route("/category/:id").put(updateCategory).delete(deleteCategory);
router.route("/category").post(createCategory);
module.exports=router;
