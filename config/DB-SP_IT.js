// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const mysql=require('mysql');

let dbConnect={

    getConnection:function(){
        return mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "Rachel272993",
                database: "SP_IT"

            }
        );

    }
}
module.exports=dbConnect;