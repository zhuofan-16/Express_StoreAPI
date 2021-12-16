// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const product=require("../models/product")
const fs=require('fs')
var mmm = require('mmmagic')
var magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
const productControl= {
    //Product Image function
    //Reference :https://lovellaa.com/shop/4
   async addProduct(req,res){
        let name=req.body.name;
        let description=req.body.description;
        let categoryid=req.body.categoryid;
        let brand=req.body.brand;
        let price=req.body.price
        let productFile=0;
        let partialFile=0
        let functionFlag=1
        if (req.hasOwnProperty('file')) {
            productFile = req.file.filename
            partialFile = productFile
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
    async getProductImage(req,res){
    let productID=req.params.id;
    product.viewProductImage(productID,function(err,result){
        if (err){
            res.status(500).json({"500 Error":err.code})
        }else{
            res.status(200).sendFile(result)
        }
    })
    }

}


module.exports=productControl