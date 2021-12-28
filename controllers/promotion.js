// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const promotion=require("../models/promotion")
const promotionControl={
  //List all promotion
  async getAllPromotion(req,res){
    promotion.viewPromotion(function(err,result){
      if (err){
        res.status(500).json({"500 Error":err.code})
      }else{
        res.status(200).json(result)
      }
    })
  },
  //Add a new promotion
  async addPromotion(req,res){
    let categoryID=null;
    let productID=null;
    let value=req.body.value;
    let promo_key=req.body.promo_key;
    let description=req.body.description;
    let start_date=req.body.start_date
    let end_date=req.body.end_date
if (req.body.hasOwnProperty('categoryid')){
  categoryID=req.body.categoryid
}else{
  productID=req.body.productid
}
promotion.newPromotion(productID,categoryID,value,promo_key,description,start_date,end_date,function(err,result){
  if (err){
    res.status(500).json({"500 Error":err.code})
  }else{
    res.status(200).json({"200 Success":result.insertId})
  }
})

  },
  //Update promotion details
  async updatePromotion(req,res){
    let promotionID=req.params.promotionid;
    let categoryID=null;
    let productID=null;
    let value=req.body.value;
    let promo_key=req.body.promo_key;
    let description=req.body.description;
    let start_date=req.body.start_date
    let end_date=req.body.end_date
    if (req.body.hasOwnProperty('categoryid')){
      categoryID=req.body.categoryid
    }else{
      productID=req.body.productid
    }

    promotion.updatePromotion(promotionID,productID,categoryID,value,promo_key,description,start_date,end_date,function(err,result){
      if (err){
        res.status(500).json({"500 Error":err.code})
      }else{
        res.status(200).json({"200 Success":"Update Success"})
      }
    })
  },
  //Delete a promotion
  async deletePromotion(req,res){
    let promotionID=req.params.promotionid;
    promotion.deletePromotion(promotionID,function(err,result){
      if (err){
        res.status(500).json({"500 Error":err.code})
      }else{
        res.status(200).json({"200 Success":"Delete Success"})
      }
    })
  },
}

module.exports=promotionControl