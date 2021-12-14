const express=require('express')
const interestControl=require("../controllers/interest")
const app=express
const router=app.Router()

router.post("/interest/:userid",interestControl.addInterest)
router.get("/interest/:id",interestControl.getInterestByID)
router.get("/interest",interestControl.getInterest)
router.put("/interest/:id",interestControl.updateInterest)
router.delete("/interest/:id",interestControl.deleteInterest)
module.exports=router