// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')
const multer  = require('multer')
const path = require('path')
const upload = multer({ dest: path.join(__dirname, '../productImage') })
const fs = require('fs')
var mmm = require('mmmagic')
var magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);
//New product
function newProduct(productFile,partialFile,name,description,categoryid,brand,price,callback){
    //Set default image path if no product image is uploaded
    let fileDirectory=path.join(__dirname, '../productImage', "default.png");
//If there is product image uploaded ,update path to image path
    if(productFile!==0){

        fileDirectory=path.join(__dirname, '../productImage', productFile)
        partialDirectory=path.join(__dirname, '../productImage', partialFile)
        fs.rename(partialDirectory, fileDirectory, function(err) {
            if ( err )
                console.log(err)
        });
        //Check fake extension file
        magic.detectFile(fileDirectory, function(err, result) {
            if (err){
                console.log(err)

            }else{
                result=result.split("/")
                //Check whether image
                if(result[0].toLowerCase()!=='image'){
                    return callback("Fake/Unsupported Image Detected",null)
                }else{
                    //Make connection
                    let connection=database.getConnection();
                    connection.connect(function(err) {
                        if (err) {
                            return callback(err, null)
                        }else{
                            //Query
                            let query="INSERT INTO product (name,description,categoryid,brand,price,product_image) VALUES (?,?,?,?,?,?)"
                            connection.query(query,[name,description,categoryid,brand,price,fileDirectory],function(err,field,rows){
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
            }
        });
        //If no product image uploaded
    }else{
        let connection=database.getConnection();
        connection.connect(function(err) {
            if (err) {
                return callback(err, null)
            }else{
                let query="INSERT INTO product (name,description,categoryid,brand,price,product_image) VALUES (?,?,?,?,?,?)"
                connection.query(query,[name,description,categoryid,brand,price,fileDirectory],function(err,field,rows){
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






}
//View a product's detail
function viewProduct(id,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            //Query
            let query="SELECT product.name,product.description,product.categoryid,category.category,product.brand,product.price,product.product_image from product inner join category on product.categoryid=category.categoryid where product.productid=?"
            connection.query(query,[id],function(err,field,rows){
                connection.end()
                if(err){
                    console.log(err)
                    return callback(err,null)

                }else{
                    //Change field name
                    let changedResult = JSON.parse(JSON.stringify(field).split('"category":').join('"categoryname":'));
                    //Return product image as base64
                    function base64_encode(file) {
                        // read binary data
                        var bitmap = fs.readFileSync(file);
                        // convert binary data to base64 encoded string
                        return new Buffer(bitmap).toString('base64');
                    }
                    changedResult[0].product_image="base64:"+base64_encode(changedResult[0].product_image)

                    return callback(null,changedResult)
                }
            })
        }

    })
}
//Remove a product
function removeProduct(productID,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            //Delete product by product id
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
//View product image
function viewProductImage(productID,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            //Query
            let query='select product_image from product where productid=?'
            connection.query(query,[productID],function(err,field,rows){
              connection.end()
                if (err){
                    return callback(err,null)
                }else{
                    //Check whether product exist
                    if (field.length===0){
                        return callback("Product not found",null)
                    }else {
                        return callback(null, field[0].product_image)
                    }

                }
            })
        }

    })
}
//View all product
function viewAllProduct(callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else {
            //Query
            let query = "SELECT product.name,product.productid,product.description,product.categoryid,category.category,product.brand,product.price from product inner join category on product.categoryid=category.categoryid "
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
            newProduct,viewProduct,removeProduct,viewProductImage,viewAllProduct
}