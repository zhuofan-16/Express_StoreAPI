// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const category=require("../models/category")
const categoryControl={
    async addCategory(req,res){
        let categoryName=req.body.category;
        let description=req.body.description;
        category.newCategory(categoryName,description,function(err,result){
            if (err){
                if (err.code==="ER_DUP_ENTRY"){
                    res.status(422).json({"422 Error":"The category name provided already exists."})
                }else{
                    res.status(500).json({"500 Error":err.code})
                }
            }else{
                res.status(204).end()
            }
        })
    },
    async getAllCategory(req,res){
        category.viewCategory(function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json(result)
            }
        })
    }
}

module.exports=categoryControl