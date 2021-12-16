// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')
const jwt=require('jsonwebtoken')
const secret=require('../config/jwtKey')
function viewCart(userID,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="Select product.name,cart.quantity,product.price*cart.quantity,cart.created_at from cart join product on cart.productid=product.productid where cart.userid=?"
            connection.query(query,[userID],function(err,field,rows){
                if (err){
                    return callback(err,null)
                }else{
                    let changedResult = JSON.parse(JSON.stringify(field).split('"product.price*cart.quantity":').join('"total price":'));
                    return callback(null,changedResult)
                }
            })
        }

    })
}
module.exports={
        viewCart
}