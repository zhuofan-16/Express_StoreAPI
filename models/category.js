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


module.exports={
    newCategory,viewCategory
}