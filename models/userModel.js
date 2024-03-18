const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:[true,"Username is required!"],
        minLength:[3,"username must be at least 3 characters"],
        maxLength:[30,"username must be at least 3 characters"]
    },
    // password:{
    //     type:String,
    //     trim:true,
    //     required:[true,"Password is required!"],
    //     match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,'Please fill a valid password']
    // },
    email:{
        type:String,
        trim:true,
        required:[true,"Email is required!"],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
},{timestamps:true,versionKey:false,})

userSchema.plugin(plm)

module.exports = mongoose.model("user",userSchema)