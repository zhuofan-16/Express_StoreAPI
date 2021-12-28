// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const interest=require("../models/interest")
const interestControl={
    //Add the interest of a user(categoryids)
        async addInterest(req,res){
            let userID=req.params.userid;
            let categoryID=req.body.categoryids
            interest.newInterest(userID,categoryID,function(err,result){
                if (err){
                    res.status(500).json({"500 Error":err.code})
                }else{
                    res.status(201).end()
                }
            })
        },
    //View interest of a user
        async getInterestByID(req,res){
            let userID=req.params.id;
            interest.viewInterestByID(userID,function(err,result){
                if (err){
                    res.status(500).json({"500 Error":err.code})
                }else{
                    res.status(200).json(result)
                }
            })

        },
    //View interest of all user (Require admin authorisation)
        async getInterest(req,res){
        interest.viewInterest(function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json(result)
            }
        })

    },
    //Update interest of user
        async updateInterest(req,res){
            let userID=req.params.id;
            let categoryids=req.body.categoryids
            interest.updateInterest(userID,categoryids,function(err,result){
                if (err){
                    res.status(500).json({"500 Error":err.code})
                }else{
                    res.status(201).json({"201 Success":"Update successful"})
                }
            })
        },
    //Delete interest of user
        async deleteInterest(req,res){
        let userID=req.params.id;
        interest.deleteInterest(userID,function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json({"200 Success":"Delete Successful"})
            }
        })
        }
}

module.exports=interestControl