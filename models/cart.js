// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')
//View user cart
function viewCart(userID,callback){
    //Connect to database
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            //If error return error
            return callback(err, null)
        }else{
            //Query Statement
            let query="Select product.name,product.productid,cart.quantity,product.price*cart.quantity,cart.created_at from cart join product on cart.productid=product.productid where cart.userid=?"
            //Make query
            connection.query(query,[userID],function(err,field,rows){
               //End connection
                connection.end()
                if (err){
                    return callback(err,null)
                }else{
                    //Change field name to total price
                    let changedResult = JSON.parse(JSON.stringify(field).split('"product.price*cart.quantity":').join('"total price":'));
                    //Return success result
                    return callback(null,changedResult)
                }
            })
        }

    })
}
//Add new items into cart
function newCart(userID,productID,quantity,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            //If error return error
            return callback(err, null)
        }else{
            //Query statement
            let checkQuery="select userid from cart where userid=? and productid=?"
            //Check whether the item is already in cart
            connection.query(checkQuery,[userID,productID],function(err,field,rows){
                if (err){
                    return callback(err,null)
                }else{
                    //If yes ,just update the quantity
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
                        //If item does not exist in cart,then add into the cart
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
//Update item quantity
function updateQuantity(userID,productID,quantity,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            //If quantity equal 0 then remove the item
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
                //If quantity not equal to 0 ,then just edit quantity
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
//Remove item
function deleteItem(userID,productID,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            //If error return error
            return callback(err, null)
        }else{
            //Make query ,delete item from cart
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
//Checkout the cart
function checkoutCart(userID,promotioncode,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        } else {
            //Query statement
            let query="Select product.name,product.productid,product.categoryid,cart.quantity,product.price*cart.quantity,cart.created_at from cart join product on cart.productid=product.productid where cart.userid=?"

            connection.query(query,[userID],function(err,productfield,productrows){
                if (err){
                    return callback(err,null)
                }else{
                    //Change field name to price
                    let changedResult = JSON.parse(JSON.stringify(productfield).split('"product.price*cart.quantity":').join('"price":'));
                    //Check whether user use promo code
                    if (promotioncode){
                        //Query statement
                        //If yes,check whether promo code is valid
                        let promoQuery="SELECT categoryid,productid,value from promotion where promo_key=? and end_date>=CURDATE() and start_date<=CURDATE()"
                        connection.query(promoQuery,[promotioncode],function(err,field,rows){
                            if (field.length===0){

                                return callback("Promo Code has expired or invalid",null)
                            }
                            else{
                                //If promo code is valid,check whether have matching products/category
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
                                //set total price
                                let total_price = 0
                                for (let i = 0; i < changedResult.length; i++) {
                                    total_price = changedResult[i].price + total_price
                                }
                                //Format result
                                changedResult = JSON.stringify(changedResult)
                                //Finally made the order
                                let finalQuery = "INSERT INTO orders (userid,payment_value,products) values (?,?,?)"
                                connection.query(finalQuery, [userID, total_price, changedResult], function (err, insertfield, insertrows) {

                                    if (err) {
                                        return callback(err, null)
                                    } else {
                                        //and clear cart
                                        let deleteQuery="Delete from cart where userid=?"
                                        connection.query(deleteQuery,[userID])
                                        connection.end()
                                        return callback(null, insertfield.insertId)
                                    }
                                })
                            }
                        })
                    }else {
//Situation where there is no promo code
                        let total_price = 0
                        //Calculate total price
                        for (let i = 0; i < changedResult.length; i++) {
                            total_price = changedResult[i].price + total_price
                        }
//Format result
                        changedResult = JSON.stringify(changedResult)
                        //Make order
                        let finalQuery = "INSERT INTO orders (userid,payment_value,products) values (?,?,?)"
                        connection.query(finalQuery, [userID, total_price, changedResult], function (err, insertfield, insertrows) {

                            if (err) {
                                return callback(err, null)
                            } else {
                                //Clear cart after order
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