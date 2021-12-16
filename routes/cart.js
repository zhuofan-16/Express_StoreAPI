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
router.post("/cart",authenticateToken,cartControl.addToCart)
router.put("/cart/:productid",authenticateToken,cartControl.editQuantity)
router.delete("/cart/:productid",authenticateToken,cartControl.deleteItem)
router.get("/cart/checkout",authenticateToken,cartControl.checkoutCart)
module.exports=router