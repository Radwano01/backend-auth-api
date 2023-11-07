const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/username")

const Login = async(req,res)=>{
    const {username, password} = req.body
    try{
        const checkUsername =await UserModel.findOne({username})
        if(checkUsername){
            console.log(checkUsername)
            const checkPassword =await bcrypt.compare(password, checkUsername.hashedPassword)
            if(checkPassword){
                const verificationToken = jwt.sign({username}, "token", {expiresIn:"1d"})
                res.status(200).json({verificationToken})
                
            }else{
                res.status(404).json("username or password is wrong")
            }
        }else{
            res.status(404).json("username or password is wrong")
        }
    }catch(err){
        res.status(500).json(err)
    }
}

const Register = async(req,res)=>{
    const {username, password} = req.body
    try{
        const checkUsername =await UserModel.findOne({username})
        if(checkUsername){
            res.status(404).json("user exist")
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const createUser =await UserModel.create({username, hashedPassword})
            res.status(200).json(createUser)
        }
    }catch(err){
        res.status(500).json(err)
    }
}

module.exports = {
    Login,
    Register,
}