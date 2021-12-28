// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const product=require("../models/product")
const fs=require('fs')
const mmm = require('mmmagic')
const path=require('path')
const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
const productControl= {
    //The default no-product image is retrieved from :https://lovellaa.com/shop/4. Last reviewed on 28 December 2021
   //Add a new product
    async addProduct(req,res){
        let name=req.body.name;
        let description=req.body.description;
        let categoryid=req.body.categoryid;
        let brand=req.body.brand;
        let price=req.body.price
        let productFile=0;
        let partialFile=0
        let functionFlag=1
        //Check whether there is file uploaded
        if (req.hasOwnProperty('file')) {
            productFile = req.file.filename
            partialFile = productFile
            //Get original extension
            let extArray = req.file.mimetype.split("/");
            let extension = "." + extArray[extArray.length - 1];
            productFile += extension

            //Only accept png,jpg,jpeg extension files
            if (extension.toLowerCase()!==".png"&&extension!==".jpg"&&extension!==".jpeg"){
               functionFlag=0

                res.status(500).json({"500 Error":"Fake/Unsupported Image Detected"})
            }
            if (req.file.size>1000000&&functionFlag===1){
                functionFlag=0

                res.status(500).json({"500 Error":"Image Size Larger Than 1MB"})

            }

        }
//Only if extension valid and size below 1mb then proceed
        if (functionFlag===1){
            product.newProduct(productFile,partialFile,name,description,categoryid,brand,price,function(err,result){
                if (err){
                    res.status(500).json({"500 Error":err})
                }else{
                    res.status(201).json({"productid":result.insertId})
                }
            })
        }

    },
    //List a product detail
    async getAllProduct(req,res){
        let id=req.params.id
        product.viewProduct(id,function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json(result)
            }
        })
    },
    //Delete a product
    async deleteProduct(req,res){
        let productID=req.params.id;
        product.removeProduct(productID,function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(204).end()
            }

        })
    },
    //Get product image of a product
    async getProductImage(req,res){
    let productID=req.params.id;
    product.viewProductImage(productID,function(err,result){
        if (err){
            res.status(500).json({"500 Error":err})
        }else{
            if (path.isAbsolute(result)){
                if (fs.existsSync(result)){
                res.status(200).sendFile(result)}
                else{
                    res.status(500).end("Missing images,you might have cleaned up the photo directory or used an invalid path")
                }
            }else{

                res.status(500).end("Please read the instructions in readme")
            }

        }
    })
    },
    //List all products
    async listAllProduct(req,res){
        product.viewAllProduct(function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json(result)
            }
        })
    }

}


module.exports=productControl