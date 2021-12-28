// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')
const jwt=require('jsonwebtoken')
const secret=require('../config/jwtKey')
//View all user
function viewUser(callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err){
        if (err){
            return callback(err,null)
        }else {
            //Query
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
//View a user's detail by ID
function viewUserByID(userID,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err){
        if (err){
            return callback(err,null)
        }else {
            //Query to find user by userid
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
//Register a new account
function registerUser(username,email,contact,password,type,profile,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err){
        if (err){
            return callback(err,null)
        }else {
            //Query to insert new user
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
//Update user detail
function updateUser(userID,username,email,contact,password,type,profile,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            //Query update user according to userid
            let query="Update users set username=?,email=?,contact=?,password=?,type=?,profile_pic_url=? where userid=?"
            connection.query(query,[username,email,contact,password,type,profile,userID],function(err,field,rows){
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
//Get authorisation token
function getToken(userID,password,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let userToken
            //Verify if user and password match
            let query="select username,type from users where userid=? and password=?"
            connection.query(query,[userID,password],function(err,field,rows){
                connection.end()
                if (err){
                    return callback(err,null)
                }else{
                    let msg;
                    //If match
                    if (field.length===1){
                        //Sign token
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