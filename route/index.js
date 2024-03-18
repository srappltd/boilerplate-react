const express = require("express")
const router = express.Router()
const passport = require("passport")
const localStrategy = require("passport-local").Strategy

const userModel = require("../models/userModel")

passport.use(new localStrategy(userModel.authenticate()))

router.get("/",(req,res)=>{
    res.json({success:true,message:"hi"})
})

router.post("/create",async (req,res)=>{
    try {
        const {username,password,email} = req.body
        const userFind = await userModel.findOne({email})
        if(userFind){
            return res.send({success:true,message:"user allready exist!"})
        }
        
        // const user = await userModel.create(req.body)
        const user = await userModel.register(new userModel(req.body),password).then(register=>{
            passport.authenticate("local")(req,res,()=>{
                res.json({success:true,user:register}) 
            })
        })
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
    }
})

module.exports = router