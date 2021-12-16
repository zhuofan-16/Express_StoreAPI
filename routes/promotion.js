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
router.get("/promotion",promotionControl.getAllPromotion)
router.post("/promotion",authenticateToken,AdminAuthorisation,promotionControl.addPromotion)
router.put("/promotion/:promotionid",authenticateToken,AdminAuthorisation,promotionControl.updatePromotion)
router.delete("/promotion/:promotionid",authenticateToken,AdminAuthorisation,promotionControl.deletePromotion)
module.exports=router