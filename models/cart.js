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
            if (quantity===0){
                let query="delete from cart where userid=? and productid=?"
                connection.query(query,[userID,productID],function(err,field,rows){
                    connection.end()
                    if (err){
                        return callback(err,null)
                    }else{
                        return callback(null,field)
                    }
                })
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
function checkoutCart(userID,promotioncode,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        } else {
            let query="Select product.name,product.productid,product.categoryid,cart.quantity,product.price*cart.quantity,cart.created_at from cart join product on cart.productid=product.productid where cart.userid=?"

            connection.query(query,[userID],function(err,productfield,productrows){
                if (err){
                    return callback(err,null)
                }else{
                    let changedResult = JSON.parse(JSON.stringify(productfield).split('"product.price*cart.quantity":').join('"price":'));

                    if (promotioncode){
                        let promoQuery="SELECT categoryid,productid,value from promotion where promo_key=? and end_date>=CURDATE() and start_date<=CURDATE()"
                        connection.query(promoQuery,[promotioncode],function(err,field,rows){
                            if (field.length===0){

                                return callback("Promo Code has expired or invalid",null)
                            }
                            else{
                                if (field[0].categoryid){

                                    for (let i=0;i<changedResult.length;i++){
                                        if (changedResult[i].categoryid===field[0].categoryid){
                                            changedResult[i].price=changedResult[i].price-field[0].value
                                        }
                                    }

                                }else{

                                    for (let i=0;i<changedResult.length;i++){
                                        if (changedResult[i].productid===field[0].productid){
                                            changedResult[i].price=changedResult[i].price-field[0].value
                                        }
                                    }
                                }
                                let total_price = 0
                                for (let i = 0; i < changedResult.length; i++) {
                                    total_price = changedResult[i].price + total_price
                                }

                                changedResult = JSON.stringify(changedResult)
                                let finalQuery = "INSERT INTO orders (userid,payment_value,products) values (?,?,?)"
                                connection.query(finalQuery, [userID, total_price, changedResult], function (err, insertfield, insertrows) {

                                    if (err) {
                                        return callback(err, null)
                                    } else {
                                        let deleteQuery="Delete from cart where userid=?"
                                        connection.query(deleteQuery,[userID])
                                        connection.end()
                                        return callback(null, insertfield.insertId)
                                    }
                                })
                            }
                        })
                    }else {

                        let total_price = 0
                        for (let i = 0; i < changedResult.length; i++) {
                            total_price = changedResult[i].price + total_price
                        }

                        changedResult = JSON.stringify(changedResult)
                        let finalQuery = "INSERT INTO orders (userid,payment_value,products) values (?,?,?)"
                        connection.query(finalQuery, [userID, total_price, changedResult], function (err, insertfield, insertrows) {

                            if (err) {
                                return callback(err, null)
                            } else {
                                let deleteQuery="Delete from cart where userid=?"
                                connection.query(deleteQuery,[userID])
                                connection.end()

                                return callback(null, insertfield.insertId)
                            }
                        })
                    }











                }
            })
    }


    })
}
module.exports={
        viewCart,newCart,updateQuantity,deleteItem,checkoutCart
}