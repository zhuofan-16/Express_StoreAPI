const express=require('express')
const categoryControl=require("../controllers/category")
const app=express
const router=app.Router()


router.post("/category",categoryControl.addCategory)
router.get("/category",categoryControl.getAllCategory)

module.exports=router