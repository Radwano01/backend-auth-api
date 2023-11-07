const mongoose = require("mongoose")

const Users =new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    hashedPassword:{
        type:String,
        require:true
    }
})

const UserModel = mongoose.model("authMobile", Users)
module.exports = UserModel