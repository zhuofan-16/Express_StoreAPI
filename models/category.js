// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')

//Add new category
function newCategory(categoryName,description,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            //If error return error
            return callback(err, null)
        }else{
            //Query
            //Add new category
            let query="INSERT INTO category (category,description) VALUES (?,?)"
            connection.query(query,[categoryName,description],function(err,field,rows){
               //End connection
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
//View all available category
function viewCategory(callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            //If error return error
            return callback(err, null)
        }else{
            //Query
            //Select all category from database
            let query="Select categoryid,category,description from category"
            connection.query(query,function(err,field,rows){
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
//Remove category
function removeCategory(categoryID,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            //Query
            //Delete selected category
            let query='DELETE from category where categoryid=?'
            connection.query(query,[categoryID],function(err,field,rows){
                if (err){
                    return callback(err,null)
                }else{
                    //Also need to remove interest when category is deleted
                    let secondQuery="update interest set categoryids=REGEXP_REPLACE(categoryids, ?, '')"
                    connection.query(secondQuery,[categoryID],function(err,field,rows){
                        if (err){
                            console.log(err)
                            return callback(err,null)
                        }else{
                            //Removing a category number may lead to result like 3,,8,2 hence need to remove the double ,
                            let thirdQuery="update interest set categoryids=REGEXP_REPLACE(categoryids,',,' , ',')"
                            connection.query(thirdQuery,function(err,field,rows){
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
            })
        }

    })
}

module.exports={
    newCategory,viewCategory,removeCategory
}