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
        let userID=req.id;
        let productID=req.body.productid;
        let quantity=req.body.quantity;
        cart.newCart(userID,productID,quantity,function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json({"200 Success":"Item added"})
            }
        })

    },
    async editQuantity(req,res){
        let userID=req.id;
    let productID=req.params.productid;
    let quantity=req.body.quantity;
    cart.updateQuantity(userID,productID,quantity,function(err,result){
        if (err){
            res.status(500).json({"500 Error":err.code})
        }else{
            res.status(200).json({"200 Success":"Edit success"})
        }
    })
    },
    async deleteItem(req,res){
        let userID=req.id;
        let productID=req.params.productid;
        cart.deleteItem(userID,productID,function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json({"200 Success":"Delete Success"})
            }
        })
    },
    async checkoutCart(req,res){
        let userID=req.id;
        let promotioncode=null
        if ('promo_key' in req.body){
            promotioncode=req.body.promo_key
        }
        cart.checkoutCart(userID,promotioncode,function(err,result){
            if (err){
                res.status(500).json({"500 Error":err})
            }else{
                res.status(200).send("Checkout Successful!Your order number is : "+result)
            }
        })


    },
}

module.exports=cartControl