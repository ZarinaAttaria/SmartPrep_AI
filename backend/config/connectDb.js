const mongoose=require('mongoose')
require('dotenv').config()
const connect=async()=>
{
    try{
        mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDb Successfully!")
    }
    catch(error)
    {
        console.log("Error in Connection", error)
        process.exit(1)
    }
}
module.exports=connect