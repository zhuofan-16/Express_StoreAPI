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
//Add new user
router.post("/users",userControl.newUser)
//Get detail of a specific user
router.get("/users/:id",userControl.getSelectedUser)
//List all users
router.get("/users",userControl.getAllUsers)
//Update a user detail
router.put("/users/:id",userControl.updateUser)
//Get token of a user
router.get("/auth",userControl.getToken)
module.exports=router