// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const express=require('express')
const categoryControl=require("../controllers/category")
const app=express
const router=app.Router()


router.post("/category",categoryControl.addCategory)
router.get("/category",categoryControl.getAllCategory)

module.exports=router