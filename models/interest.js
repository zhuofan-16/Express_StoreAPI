// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')
function newInterest(userID,categoryID,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="INSERT INTO interest (userid,categoryids) VALUES (?,?)"
            connection.query(query,[userID,categoryID],function(err,field,rows){
                connection.end();
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
function viewInterestByID(userID,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else {
            let initialQuery="SELECT categoryids from interest where userid=?"
            connection.query(initialQuery,[userID],function(err,field,rows){
                if (err){
                    return callback(err,null)
                }else{
                    if (!field[0].categoryids){
                        return callback(null,"No interest")
                    }
                    changeResult=field[0].categoryids.split(seperator=',')
                    console.log(changeResult)
                    let secondQuery='SELECT category,description from category where categoryid=? '
                    for (let i=1;i<changeResult.length;i++){
                        secondQuery+=" OR categoryid=?"
                    }
                    connection.query(secondQuery,changeResult,function(err,field,rows){
                      connection.end()
                        if (err){
                            console.log(err)
                            return callback(err,null)
                        }else{
                            console.log(field)
                            let interest=field
                            let finalResult={
                                "userid":userID,
                                interest
                            }
                            return callback(null,finalResult)
                        }
                    })

                }
            })
        }

    })
}
function viewInterest(callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else {
            let initialQuery="SELECT userid,categoryids from interest"
            connection.query(initialQuery,function(err,field,rows){
                if (err){
                    return callback(err,null)
                }else{
                    if (!field[0].categoryids){
                        return callback(null,"No interest")
                    }
                    // console.log(field[0].userid)
                    let listCategory=new Object()
                    // console.log(field)
                    let firstfield=field
                    let secondQuery='select categoryid,category,description from category'
                    connection.query(secondQuery,function(err,field,rows){
                       connection.end()
                        let result=field;
                        for (let i=0;i<result.length;i++){
                            listCategory[result[i].categoryid]=result[i].category
                        }
                        var key
                        for ( key in listCategory) {
                            if (!listCategory.hasOwnProperty(key)) {
                                continue;
                            }
                            for (let j=0;j<firstfield.length;j++){
                                firstfield[j].categoryids = firstfield[j].categoryids.replace(new RegExp(key, "gi"), listCategory[key])

                            }

                        }
                    return callback(null,firstfield)
                    })







                }
            })
        }

    })
}
function updateInterest(userID,categoryids,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query='update interest set categoryids=? where userid=?'
            connection.query(query,[categoryids,userID],function(err,field,rows){
            connection.end()
                if (err){
            return callback(err,null)
        }else{
        return callback(null,rows)
        }


        })
        }


    })
}
function deleteInterest(userID,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            let query="DELETE FROM interest where userid=?"
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
module.exports={
    newInterest,viewInterestByID,viewInterest,updateInterest,deleteInterest

}