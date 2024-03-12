require("dotenv").config({path:"./.env"})
const express = require("express")
const app = express()
const path = require("path")
const indexRouter = require("./route/index")

app.set(express.json())
app.set(express.urlencoded({extended:true}))
app.use(express.static(path.dirname(__dirname,"public")))
app.use("/",indexRouter)

app.listen(process.env.PORT,()=>{
    console.log(`The server is runnig on port http://localhost:${3000}`)
})