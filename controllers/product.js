// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const product=require("../models/product")
const productControl= {
    async addProduct(req,res){
        let name=req.body.name;
        let description=req.body.name;
        let categoryid=req.body.categoryid;
        let brand=req.body.brand;
        let price=req.body.price
        product.newProduct(name,description,categoryid,brand,price,function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(201).json({"productid":result.insertId})
            }
        })
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
    }

}


module.exports=productControl