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
//Add user interest(In categories)
router.post("/interest/:userid",interestControl.addInterest)
//Retrieve a user's interest
router.get("/interest/:id",interestControl.getInterestByID)
//Retrieve interest of all user -Require admin authorisation
router.get("/interest",authenticateToken,AdminAuthorisation,interestControl.getInterest)
//Update user preference/interest on categories
router.put("/interest/:id",interestControl.updateInterest)
//Delete user interest
router.delete("/interest/:id",interestControl.deleteInterest)
module.exports=router