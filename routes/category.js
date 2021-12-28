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

//Add new category
router.post("/category",categoryControl.addCategory)
//View all available categories
router.get("/category",categoryControl.getAllCategory)
//Delete a category
router.delete("/category/:id",categoryControl.deleteCategory)
module.exports=router