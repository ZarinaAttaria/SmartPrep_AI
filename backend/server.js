const express=require('express')
const cors=require('cors')
const app= express();
const connectDb=require('./config/connectDb')
const userRoutes=require('./routes/userRoute')
app.use(express.json())
app.use(cors())

connectDb();
app.use('/users', userRoutes)

const PORT= 8000;
app.listen(PORT, ()=>{
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})