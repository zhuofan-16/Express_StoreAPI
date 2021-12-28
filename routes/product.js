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
//Upload path
const upload =  multer({ dest: path.join(__dirname, '../productImage') })
//Add new product
router.post("/product",upload.single('product_image'),productControl.addProduct)
//Get details of a product
router.get("/product/:id",productControl.getAllProduct)
//List all products
router.get("/product",productControl.listAllProduct)
//Delete a product
router.delete("/product/:id",productControl.deleteProduct)
//Get image of a product
router.get("/product/image/:id",productControl.getProductImage)
module.exports=router