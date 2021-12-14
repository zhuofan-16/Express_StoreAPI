const express=require('express')
const productControl=require("../controllers/product")
const app=express
const router=app.Router()
// Need to add quantity
router.post("/product",productControl.addProduct)
router.get("/product/:id",productControl.getAllProduct)
router.delete("/product/:id",productControl.deleteProduct)
module.exports=router