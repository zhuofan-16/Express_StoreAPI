// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')
//View promotion
function viewPromotion(callback){
   //Make connection
   let connection=database.getConnection();
   connection.connect(function(err) {
      if (err) {
         return callback(err, null)
      }else{
         //Query to select promotions that are still available(Check date) -Check category promotion
         let queryCategory="Select promotion.categoryid,category.category,promotion.promo_key,promotion.value,promotion.description,promotion.start_date,promotion.end_date from promotion join category on category.categoryid=promotion.categoryid where promotion.end_date>=CURDATE() and promotion.start_date<=CURDATE() and promotion.categoryid!=''"
      connection.query(queryCategory,function(err,field,rows){
         if (err){
            console.log(err)
            return callback(err,null)
         }else{
            //Query to select promotions that are still available(Check date) -Check item promotion
            let queryItem="Select promotion.productid,product.name,promotion.promo_key,promotion.value,promotion.description,promotion.start_date,promotion.end_date from promotion join product on product.productid=promotion.productid where promotion.end_date>=CURDATE() and promotion.start_date<=CURDATE() and promotion.productid!=''"
            connection.query(queryItem,function(err,fielditem,rowsitem){
             connection.end()
               if (err){
                  return callback(err,null)
               }else{
                  //Merge 2 json object
                  let result = field.concat(fielditem)


                  return callback(null,result)
               }
            })

         }
      })
      }

   })
}
//Make new promotion
function newPromotion(productID,categoryID,value,promo_key,description,start_date,end_date,callback){
   //Make connection
   let connection=database.getConnection();
   connection.connect(function(err) {
      if (err) {
         return callback(err, null)
      }else{
         //Query
         let query="insert into promotion (productid,categoryid,value,promo_key,description,start_date,end_date) values (?,?,?,?,?,?,?)"
         connection.query(query,[productID,categoryID,value,promo_key,description,start_date,end_date],function(err,field,rows){
           connection.end()
            if (err){
               console.log(err)
               return callback(err,null)
            }else{
               return callback(null,field)
            }
         })
      }


   })
}
//Update promotion detail
function updatePromotion(promotionID,productID,categoryID,value,promo_key,description,start_date,end_date,callback){
   //Make connection
   let connection=database.getConnection();
   connection.connect(function(err) {
      if (err) {
         return callback(err, null)
      }else{
         //Make query
         let query="update promotion set productid=?,categoryid=?,value=?,promo_key=?,description=?,start_date=?,end_date=? where promotionid=?"
         connection.query(query,[productID,categoryID,value,promo_key,description,start_date,end_date,promotionID],function(err,field,rows){
            connection.end()
            if (err){
               console.log(err)
               return callback(err,null)
            }else{
               return callback(null,field)
            }
         })
      }


   })
}
//Delete promotion
function deletePromotion(promotionID,callback){
   //Make connection
   let connection=database.getConnection();
   connection.connect(function(err) {
      if (err) {
         return callback(err, null)
      }else{
         //Query to delete promotion based on id
         let query="DELETE from promotion where promotionid=?"
         connection.query(query,promotionID,function(err,field,rows){
            connection.end()
            if (err){
               return callback(err,null)
            }else{
               return callback(null,field)
            }
         })
      }

   })
}
module.exports={
   viewPromotion,newPromotion,updatePromotion,deletePromotion
}