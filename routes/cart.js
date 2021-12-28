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
//Get cart items -User specific-Require login token (Login token can be retrieved from /auth)
router.get("/cart",authenticateToken,cartControl.getCart)
//add items to cart - User specific-Require login token
router.post("/cart",authenticateToken,cartControl.addToCart)
//Edit cart item quantity- User specific-Require login token
router.put("/cart/:productid",authenticateToken,cartControl.editQuantity)
//Delete item from cart- User specific-Require login token
router.delete("/cart/:productid",authenticateToken,cartControl.deleteItem)
//Checkout the cart- User specific-Require login token
router.get("/cart/checkout",authenticateToken,cartControl.checkoutCart)
module.exports=router