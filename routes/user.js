const express=require('express')
const userControl=require("../controllers/user")
const app=express
const router=app.Router()
router.post("/users",userControl.newUser)
router.get("/users/:id",userControl.getSelectedUser)
router.get("/users",userControl.getAllUsers)
router.put("/users/:id",userControl.updateUser)
module.exports=router