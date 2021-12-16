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
const multer  = require('multer')
const path = require("path");
const upload =  multer({ dest: path.join(__dirname, '../productImage') })
// Need to add quantity
router.post("/product",upload.single('product_image'),productControl.addProduct)
router.get("/product/:id",productControl.getAllProduct)
router.delete("/product/:id",productControl.deleteProduct)
router.get("/product/image/:id",productControl.getProductImage)
module.exports=router