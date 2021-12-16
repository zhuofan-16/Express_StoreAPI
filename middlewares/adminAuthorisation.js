// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================

function AdminAuthorisation(req,res,next){
    if (req.role.toLowerCase()==="customer"){
        return res.status(403).send("You are unauthorised to carry out this operation")
    }else if (req.role.toLowerCase()==="admin"){
        next()
    }
}


module.exports=AdminAuthorisation