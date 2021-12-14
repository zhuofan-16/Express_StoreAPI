const interest=require("../models/interest")
const interestControl={
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
        async getInterest(req,res){
        interest.viewInterest(function(err,result){
            if (err){
                res.status(500).json({"500 Error":err.code})
            }else{
                res.status(200).json(result)
            }
        })

    },
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