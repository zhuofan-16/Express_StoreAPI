// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')


function newCategory(categoryName,description,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="INSERT INTO category (category,description) VALUES (?,?)"
            connection.query(query,[categoryName,description],function(err,field,rows){
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
function viewCategory(callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
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
function removeCategory(categoryID,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query='DELETE from category where categoryid=?'
            connection.query(query,[categoryID],function(err,field,rows){
                if (err){
                    return callback(err,null)
                }else{
                    let secondQuery="update interest set categoryids=REGEXP_REPLACE(categoryids, ?, '')"
                    connection.query(secondQuery,[categoryID],function(err,field,rows){
                        if (err){
                            console.log(err)
                            return callback(err,null)
                        }else{
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