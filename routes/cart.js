// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const express=require('express')
const cartControl=require("../controllers/cart")
const authenticateToken=require("../middlewares/jwt")
const app=express
const router=app.Router()
router.get("/cart",authenticateToken,cartControl.getCart)
router.post("/cart/:id",cartControl.addToCart)
router.put("/cart/:userid/:productid",cartControl.editQuantity)
router.delete("/cart/:id",cartControl.deleteItem)
module.exports=router