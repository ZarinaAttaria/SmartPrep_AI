const jwt=require('jsonwebtoken')
require('dotenv').config()

const authenticateToken=(req, res, next)=>{
    const authHeader=req.headers['authorization']
    const token= authHeader && authHeader.split(' ')[1];
    if(!token)
    {
        return res.status(401).json({
            messgae:"Access Token is Required!"
        })
    }
    jwt.verify(token, process.env.JWT_SECRET, (error,user)=>{
        if(error)
        {
            return res.status(403).json({message:"Invalid or Expired Token."})
        }
        req.user=user;
        next();
    })
}

modules.exports=authenticateToken