// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const express=require('express')
const reviewControl=require("../controllers/review")
const app=express
const router=app.Router()

//Add product reviews
router.post("/product/:id/review",reviewControl.addReview)
//Get reviews of a product
router.get("/product/:id/reviews",reviewControl.getAllReview)

module.exports=router