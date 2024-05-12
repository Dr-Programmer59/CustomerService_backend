const express=require("express")
const {isAuthenticatedUser,isAuthorizeRole}=require("../middleware/auth");
const { getAllbankdetails, deleteAccountDetails, createAccountdetails, updateAccountDetails } = require("../controllers/bankDetailsController");
const router=express.Router();

router.route("/admin/accounts").get(getAllbankdetails);
router.route("/admin/accounts/:id").put(updateAccountDetails).delete(deleteAccountDetails);
router.route("/admin/account").post(createAccountdetails);
module.exports=router;
