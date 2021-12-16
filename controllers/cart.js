// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const cart=require("../models/cart")
const cartControl={
    async getCart(req,res){
        let userID=req.id;
        cart.viewCart(userID,function(err,result){
        if (err){
            res.status(500).json({"500 Error":err.code})
        }else{
            res.status(200).json(result)
        }
        })

    },
    async addToCart(req,res){
        let userID=req.params.id;
        let productID=req.body.productid;
        let quantity=req.body.quantity
    },
    async editQuantity(req,res){

    },
    async deleteItem(req,res){

    }
}

module.exports=cartControl