// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const category=require("../models/category")
const categoryControl={
    //Add a new category
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
    //Retrieve all category
    async getAllCategory(req,res){
        category.viewCategory(function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json(result)
            }
        })
    },
    //Delete a category
    async deleteCategory(req,res){
        let categoryID=req.params.id;
        category.removeCategory(categoryID,function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json({"200 Success":"Delete Successful"})
            }
        })
    }
}

module.exports=categoryControl