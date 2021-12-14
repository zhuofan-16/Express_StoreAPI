const database=require('../config/DB-SP_IT')
function newReview(productID,userID,rating,review,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="INSERT INTO review (productid,userid,rating,review) VALUES (?,?,?,?)"
            connection.query(query,[productID,userID,rating,review],function(err,field,rows){
                connection.end()
                    if (err){
                        return callback(err,null)
                    }else{
                        return callback(null,field.insertId)
                    }

            })


        }


    })
}
function viewReview(productID,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="SELECT review.productid,review.userid,users.username,review.rating,review.review,review.created_at from review inner join users on review.userid=users.userid where review.productid=?"
            connection.query(query,[productID],function(err,field,rows){
                connection.end();
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
                newReview,viewReview
}