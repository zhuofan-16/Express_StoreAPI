// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const express=require('express')
const productControl=require("../controllers/product")
const app=express
const router=app.Router()
// Need to add quantity
router.post("/product",productControl.addProduct)
router.get("/product/:id",productControl.getAllProduct)
router.delete("/product/:id",productControl.deleteProduct)
module.exports=router