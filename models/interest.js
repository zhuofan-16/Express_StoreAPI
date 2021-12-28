// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const database=require('../config/DB-SP_IT')
//Add user interest
function newInterest(userID,categoryID,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            //Query
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
//View interest of a user
function viewInterestByID(userID,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else {
            //Query to get categoryids and process it
            let initialQuery="SELECT categoryids from interest where userid=?"
            connection.query(initialQuery,[userID],function(err,field,rows){
                if (err){
                    return callback(err,null)
                }else{

                    //If no interest field[0].hasOwnProperty(categoryids)
                    if (!field.length){
                        return callback(null,"No interest")
                    }
                    //Process the retrieve data ,break the string
                    changeResult=field[0].categoryids.split(seperator=',')

                    //Query for category name  using categoryid
                    let secondQuery='SELECT category,description from category where categoryid=? '
                    //Extend query statement depending on number of categories
                    for (let i=1;i<changeResult.length;i++){
                        secondQuery+=" OR categoryid=?"
                    }
                    connection.query(secondQuery,changeResult,function(err,field,rows){
                      connection.end()
                        if (err){
                            return callback(err,null)
                        }else{
                            let interest=field
                            //Format result
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
//View interest of all users
function viewInterest(callback){
    //Make connection
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

                    let listCategory=new Object()
                    // console.log(field)
                    let firstfield=field
                    //Query
                    let secondQuery='select categoryid,category,description from category'
                    connection.query(secondQuery,function(err,field,rows){
                       connection.end()
                        let result=field;
                        for (let i=0;i<result.length;i++){
                            //Move local
                            listCategory[result[i].categoryid]=result[i].category
                        }
                        //Replace categoryid with category name
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
//Update user interest
function updateInterest(userID,categoryids,callback){
    //Make connection
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            //Query
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
//Delete user interest
function deleteInterest(userID,callback){
    let connection=database.getConnection();
    connection.connect(function(err) {
        if (err) {
            return callback(err, null)
        }else{
            //Query
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