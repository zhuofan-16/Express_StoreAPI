// ;==========================================
// ; Title:  Express_StoreAPI
// ; Author: ZhuoFan Chen
// ; Email:zhuofan.21@ichat.sp.edu.sg
// ; Date:   14 Dec 2021
// ;==========================================
const express=require('express')
const userControl=require("./routes/user")
const categoryControl=require("./routes/category")
const productControl=require("./routes/product")
const reviewControl=require("./routes/review")
const interestControl=require("./routes/interest")
const cartControl=require("./routes/cart")
const promotionControl=require("./routes/promotion")
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
app.use(cartControl)
app.use(promotionControl)

const server=app.listen(port,function(){

    console.log("SP_IT API STARTED ON http://localhost:%s",port);
});