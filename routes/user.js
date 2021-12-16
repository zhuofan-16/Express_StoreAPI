// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const express=require('express')
const userControl=require("../controllers/user")
const app=express
const router=app.Router()
router.post("/users",userControl.newUser)
router.get("/users/:id",userControl.getSelectedUser)
router.get("/users",userControl.getAllUsers)
router.put("/users/:id",userControl.updateUser)
router.get("/auth",userControl.getToken)
module.exports=router