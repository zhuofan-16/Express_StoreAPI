// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const express=require('express')
const orderControl=require("../controllers/order")
const authenticateToken=require("../middlewares/jwt")
const app=express
const router=app.Router()

router.get("/order",authenticateToken,orderControl.getAllOrder)

module.exports=router