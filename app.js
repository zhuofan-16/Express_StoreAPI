/*
Student ID:P2100746
Student Name:CHEN ZHUOFAN
Student Class:DAAA/FT/1B/04
Date of Submission :07/12/2021
 */
const express=require('express')
const userControl=require("./routes/user")
const categoryControl=require("./routes/category")
const productControl=require("./routes/product")
const reviewControl=require("./routes/review")
const interestControl=require("./routes/interest")
const app=express()

const user=require('./routes/user');
const port=8090;
const bodyParser=require('body-parser');
const urlencodedParser=bodyParser.urlencoded({extended:false});
app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser);
app.use(userControl)
app.use(categoryControl)
app.use(productControl)
app.use(reviewControl)
app.use(interestControl)

const server=app.listen(port,function(){

    console.log("SP_IT API STARTED ON http://localhost:%s",port);
});