const express=require('express')
const reviewControl=require("../controllers/review")
const app=express
const router=app.Router()


router.post("/product/:id/review",reviewControl.addReview)
router.get("/product/:id/reviews",reviewControl.getAllReview)

module.exports=router