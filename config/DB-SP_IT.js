/*
Student ID:P2100746
Student Name:CHEN ZHUOFAN
Student Class:DAAA/FT/1B/04
Date of Submission :07/12/2021
 */
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