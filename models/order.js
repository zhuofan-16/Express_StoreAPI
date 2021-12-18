// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')

function viewOrder(userID,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="SELECT orderid,payment_value,products,created_at from orders where userid=?"
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

module.exports={
viewOrder
}