const database=require('../config/DB-SP_IT')
function viewUser(callback){
    let connection=database.getConnection();
    connection.connect(function(err){
        if (err){
            return callback(err,null)
        }else {
            let query = "SELECT userid,username,email,contact,type,profile_pic_url,created_at from users"
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
function viewUserByID(userID,callback){
    let connection=database.getConnection();
    connection.connect(function(err){
        if (err){
            return callback(err,null)
        }else {
            let query = "SELECT userid,username,email,contact,type,profile_pic_url,created_at from users where userid=?"
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
function registerUser(username,email,contact,password,type,profile,callback){
    let connection=database.getConnection();
    connection.connect(function(err){
        if (err){
            return callback(err,null)
        }else {
            let query = "INSERT INTO users (username,email,contact,password,type,profile_pic_url) VALUE (?,?,?,?,?,?)"
            connection.query(query,[username,email,contact,password,type,profile],function(err,field,rows){
                connection.end()
                if (err){
                    console.log(err)
                    return callback(err,null)
                }else{
                    return callback(null,field)
                }
            })
        }


    })
}
function updateUser(userID,username,email,contact,password,type,profile,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="Update users set username=?,email=?,contact=?,password=?,type=?,profile_pic_url=? where userid=?"
            connection.query(query,[username,email,contact,password,type,profile,userID],function(err,field,rows){
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
    viewUser,viewUserByID,registerUser,updateUser
}