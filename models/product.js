// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')
function newProduct(name,description,categoryid,brand,price,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="INSERT INTO product (name,description,categoryid,brand,price) VALUES (?,?,?,?,?)"
            connection.query(query,[name,description,categoryid,brand,price],function(err,field,rows){
             connection.end()
                if(err){
                    return callback(err,null)
                }else{
                    return callback(null,field)
                }
            })
        }

    })
}
function viewProduct(id,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="SELECT product.name,product.description,product.categoryid,category.category,product.brand,product.price from product inner join category on product.categoryid=category.categoryid where product.productid=?"
            connection.query(query,[id],function(err,field,rows){
                connection.end()
                if(err){
                    console.log(err)
                    return callback(err,null)

                }else{
                    let changedResult = JSON.parse(JSON.stringify(field).split('"category":').join('"categoryname":'));
                    return callback(null,changedResult)
                }
            })
        }

    })
}
function removeProduct(productID,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="DELETE from product where productid=?"
            connection.query(query,[productID],function(err,field,rows){
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
            newProduct,viewProduct,removeProduct
}