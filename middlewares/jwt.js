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
                next()
            }
        })
    }

}



module.exports=authenticateToken