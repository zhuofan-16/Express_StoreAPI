// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const reviewProduct=require("../models/review")
const reviewControl={
    //Add a new review to a product
        async addReview(req,res){
            let productID=req.params.id;
            let userID=req.body.userid;
            let rating=req.body.rating;
            let review=req.body.review;
            reviewProduct.newReview(productID,userID,rating,review,function(err,result){
                if (err){
                    res.status(500).json({"500 Error":err.code})
                }else{
                    res.status(201).json({"reviewid":result})
                }
            })
        },
    //Get all review of a product
        async getAllReview(req,res){
            let productID=req.params.id;
            reviewProduct.viewReview(productID,function(err,result){
                if (err){
                    res.status(500).json({"500 Error":err.code})
                }else{
                    res.status(200).json(result)
                }
            })
        }
}

module.exports=reviewControl