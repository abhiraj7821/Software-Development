const express = require('express');

const app = express();
app.use(express.json());

require('dotenv').config();
PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`App is running on http://localhost:${PORT}/`);
})

// Initialising DB
const dbConnect = require("./Config/database")
dbConnect();

//Custom Routes
const postRoutes = require('./Routes/postRoutes')
app.use('/postapi/v1',postRoutes)

// Default Route
app.get('/',(req,res)=>{
    res.send("<h4>Hi this is blog post!</h4>")
})