// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')
const jwt=require('jsonwebtoken')
const secret=require('../config/jwtKey')
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
function getToken(userID,password,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let userToken
            let query="select username,type from users where userid=? and password=?"
            connection.query(query,[userID,password],function(err,field,rows){
                if (err){
                    return callback(err,null)
                }else{
                    let msg;
                    if (field.length===1){
                        userToken=jwt.sign({id:userID,name:field[0].username,role:field[0].type},secret.key,{
                            expiresIn:1209600 //expire in 2 weeks

                        })
                        msg='Verification Success!Welcome '+field[0].username+',Your Auth:'+userToken
                    }else{
                        msg="Verification Failed!"
                    }
                    return callback(null,msg)
                }
            })
        }

    })

}
module.exports={
    viewUser,viewUserByID,registerUser,updateUser,getToken
}