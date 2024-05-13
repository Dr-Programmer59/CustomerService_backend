const express=require("express")
const {isAuthenticatedUser,isAuthorizeRole}=require("../middleware/auth");
const { updateuserMessages, deleteuserMessages, getAlluserMessages, createuserMessages, getuserMessage  } = require("../controllers/userMessageController");
const router=express.Router();

router.route("/messages").get(getAlluserMessages);
router.route("/message/:id").put(updateuserMessages).delete(deleteuserMessages).post(createuserMessages ).get(getuserMessage);

module.exports=router;
