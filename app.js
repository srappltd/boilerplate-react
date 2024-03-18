require("dotenv").config({path:"./.env"})
const express = require("express")
const app = express()
const path = require("path")
const logger = require("morgan")
const passport = require("passport")
const session = require("express-session")
const indexRouter = require("./route/index")
const { appendFile } = require("fs")

const userModel = require("./models/userModel")

require("./models/config").Mongoose(process.env.MONGO_URL)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger("tiny"))

app.use(session({secret:"react",resave:false,saveUninitialized:false,cookie:{maxAge:24*60*60*1000}}))

app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user,cb)=>{
    cb(null,user)
})
passport.deserializeUser((user,cb)=>{
    cb(null,user)
})

app.use(express.static(path.dirname(__dirname,"public")))
app.use("/api/user",indexRouter)

app.all("*",(req,res,next)=>{
    res.status(404).json({success:false,message:`${req.url} Route not found !`})
})

app.listen(process.env.PORT,()=>{
    console.log(`The server is runnig on port http://localhost:${process.env.PORT}`)
})