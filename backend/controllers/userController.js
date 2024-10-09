const User=require('../models/userModel')
const{generateAccessToken, generateRefreshToken}=require('../utils/tokenUtils')
const jwt=require('jsonwebtoken')

async function signup(req,res){
    try{
        let user=new User({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        })
        user= await user.save();
        res.status(201).json({message:"User created Successfully."})

    }
    catch(error)
    {
        console.log("Signup Error.", error)
        res.status(500).json({message:"Error in Creating User", error:error.message})
    }
}

async function login(req, res)
{
    try{
    const user=await User.findOne({username:req.body.username})
    if(!user || !(await user.comparePassword(req.body.password))){
        return res.status(401).json({ message: 'Invalid username or password' })
    }
    const accessToken= generateAccessToken(user._id)
    const refreshToken= generateRefreshToken(user._id)
    res.json({user})
}
catch(error){
    res.status(500).json({ message: 'Login failed', error:error.message });
}
}
module.exports={
    signup,
    login
}