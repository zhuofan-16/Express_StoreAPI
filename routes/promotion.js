// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const express=require('express')
const promotionControl=require("../controllers/promotion")
const app=express
const router=app.Router()
router.get("/promotion",promotionControl.getAllPromotion)
router.post("/promotion",promotionControl.addPromotion)
router.put("promotion/:promotionid",promotionControl.updatePromotion)
router.delete("/promotion/:promotionid",promotionControl.deletePromotion)
module.exports=router