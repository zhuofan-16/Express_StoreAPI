// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const express=require('express')
const promotionControl=require("../controllers/promotion")
const authenticateToken = require("../middlewares/jwt");
const AdminAuthorisation=require("../middlewares/adminAuthorisation")
const app=express
const router=app.Router()
//Get all promotions
router.get("/promotion",promotionControl.getAllPromotion)
//Add a new promotion
router.post("/promotion",authenticateToken,AdminAuthorisation,promotionControl.addPromotion)
//Update details of a promotion
router.put("/promotion/:promotionid",authenticateToken,AdminAuthorisation,promotionControl.updatePromotion)
//Delete a promotion
router.delete("/promotion/:promotionid",authenticateToken,AdminAuthorisation,promotionControl.deletePromotion)
module.exports=router