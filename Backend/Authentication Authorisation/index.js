const express = require('express')
const app = express()
require('dotenv').config();


// Middlewares
app.use(express.json());

// Default Route:
app.get('/',(req,res)=>{
    res.send("This is my Authentication class")
})


// Connect DB
const connectDB = require('./Config/database')
connectDB();


// route import and mount
const userRoute = require('./Routes/user')
app.use("/api/v1",userRoute);


// Activate
PORT=process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Server is live on http://localhost:${PORT}`);
});
