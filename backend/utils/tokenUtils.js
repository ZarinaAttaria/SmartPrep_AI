const jwt= require('jsonwebtoken')
require('dotenv').config()

const generateAccessToken=(userId)=>jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn:'10d'})
const generateRefreshToken=(userId)=>jwt.sign({userId},process.env.JWT_REFRESH_SECRET, {expiresIn:'20d'})

module.exports={
    generateAccessToken,
    generateRefreshToken
}