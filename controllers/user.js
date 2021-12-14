const user=require("../models/user")
const userControl={
    async getAllUsers(req,res){
        user.viewUser(function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json(result)
            }
        })
    },
    async getSelectedUser(req,res){
        let userID=req.params.id;
        user.viewUserByID(userID,function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json(result)
            }
        })
    },
    async newUser(req,res){
        let username=req.body.username
        let email=req.body.email
        let contact=req.body.contact
        let password=req.body.password
        let type=req.body.type
        let profile=req.body.profile_pic_url
        user.registerUser(username,email,contact,password,type,profile,function(err,result){
            if (err){
                if (err.code==="ER_DUP_ENTRY"){
                    res.status(422).json({"422 Error":" The new username OR new email provided already exists."})
                }else{
                res.status(500).json({"500 Error":err.code})
                }
            }else{
                res.status(200).json({"userid":result.insertId})
            }
        })
    },
    async updateUser(req,res){
        let userID=req.params.id;
        let username=req.body.username
        let email=req.body.email
        let contact=req.body.contact
        let password=req.body.password
        let type=req.body.type
        let profile=req.body.profile_pic_url
        user.updateUser(userID,username,email,contact,password,type,profile,function(err,result){
            if (err){
                if (err.code==="ER_DUP_ENTRY"){
                    res.status(422).json({"422 Error":" The new username OR new email provided already exists."})
                }else{
                    res.status(500).json({"500 Error":err.code})
                }
            }else{
                res.status(204).end()
            }
        })


    },

}

module.exports=userControl