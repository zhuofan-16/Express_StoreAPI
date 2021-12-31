// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')
//View user order
function viewOrder(userID,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            //Query rank desc so that latest come first
            let query="SELECT orderid,payment_value,products,created_at from orders where userid=? order by orderid DESC"
            connection.query(query,[userID],function(err,field,rows){
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
//View all user order
function viewOrderAll(callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            //Query
            let query="SELECT orderid,payment_value,products,created_at from orders order by orderid DESC"
            connection.query(query,function(err,field,rows){
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
viewOrder,viewOrderAll
}