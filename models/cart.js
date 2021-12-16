// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')
function viewCart(userID,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="Select product.name,product.productid,cart.quantity,product.price*cart.quantity,cart.created_at from cart join product on cart.productid=product.productid where cart.userid=?"
            connection.query(query,[userID],function(err,field,rows){
               connection.end()
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
function newCart(userID,productID,quantity,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let checkQuery="select userid from cart where userid=? and productid=?"
            connection.query(checkQuery,[userID,productID],function(err,field,rows){
                if (err){
                    return callback(err,null)
                }else{
                    if (field.length>0){
                        let updateQuery="update cart set quantity=quantity+? where userid=? and productid=?"
                        connection.query(updateQuery,[quantity,userID,productID],function(err,field,rows){
                         connection.end()
                            if (err){
                                return callback(err,null)
                            }else{
                                return callback(null,field)
                            }
                        })
                    }else{
                        let query="insert into cart (userid,productid,quantity) VALUES (?,?,?)"
                        connection.query(query,[userID,productID,quantity],function(err,field,rows){
                         connection.end()
                            if (err){
                                return callback(err,null)
                            }else{
                                return callback(null,field)
                            }
                        })
                    }
                }
            })

        }

    })
}
function updateQuantity(userID,productID,quantity,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="update cart set quantity=? where userid=? and productid=?"
            connection.query(query,[quantity,userID,productID],function(err,field,rows){
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
function deleteItem(userID,productID,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query='delete from cart where userid=? and productid=? '
            connection.query(query,[userID,productID],function(err,field,rows){
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
        viewCart,newCart,updateQuantity,deleteItem
}