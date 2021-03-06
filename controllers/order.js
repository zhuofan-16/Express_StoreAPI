// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const order=require("../models/order")
const orderControl= {
//Retrieve all order made by a user
    async getAllOrder(req,res){
        let userID=req.id;
        order.viewOrder(userID,function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json(result)
            }
        })
    },
    //Get all order of all user (Need admin authorisation)
    async getFullListOrder(req,res){
        order.viewOrderAll(function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json(result)
            }
        })
    }

}

module.exports=orderControl