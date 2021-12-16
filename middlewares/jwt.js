// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const jwt = require('jsonwebtoken');
const secret=require('../config/jwtKey')
function authenticateToken(req, res, next){
    let token = req.headers['authorization'];
    if (token == null || !token.includes('Bearer')) {
        return res.status(403).send("Verification Failed,please login")
    }else{
        token=token.split('Bearer ')[1]
        jwt.verify(token,secret.key,function(err,result){
            if (err){
                return res.status(403).send("Verification Failed")
            }else{
                req.id=result.id
                req.role=result.role
                next()
            }
        })
    }

}



module.exports=authenticateToken