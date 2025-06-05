const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_DB_COONECTION_URL;

const dbConnect = ()=>{
    mongoose.connect(uri)
    .then(()=>{
        console.log("Db connection Successfuly");
    })
    .catch(()=>{
        console.log("Db Connection failed")
        console.error("Problem Connecting DB")
        process.exit(1);
    })
}


module.exports = dbConnect;