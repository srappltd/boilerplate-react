const mongoose = require("mongoose")

module.exports.Mongoose = async (MONGO_URL) =>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Database connected")
    } catch (error) {
        console.log(error)
    }
}