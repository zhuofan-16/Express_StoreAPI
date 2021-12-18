// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const express=require('express')
const interestControl=require("../controllers/interest")
const authenticateToken = require("../middlewares/jwt");
const AdminAuthorisation = require("../middlewares/adminAuthorisation");
const app=express
const router=app.Router()

router.post("/interest/:userid",interestControl.addInterest)
router.get("/interest/:id",interestControl.getInterestByID)
router.get("/interest",authenticateToken,AdminAuthorisation,interestControl.getInterest)
router.put("/interest/:id",interestControl.updateInterest)
router.delete("/interest/:id",interestControl.deleteInterest)
module.exports=router