// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const express=require('express')
const orderControl=require("../controllers/order")
const authenticateToken=require("../middlewares/jwt")
const AdminAuthorisation=require("../middlewares/adminAuthorisation")
const app=express
const router=app.Router()
//Retrieve order of user -User specific
router.get("/order",authenticateToken,orderControl.getAllOrder)
//Retrieve orders of all user -Require admin authorisation
router.get('/order/all',authenticateToken,AdminAuthorisation,orderControl.getFullListOrder)
module.exports=router