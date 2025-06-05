const mongoose = require('mongoose');
require('dotenv').config();

uri=process.env.MONGO_DB_URL;


const connectDB = ()=>{
    mongoose.connect(uri)
    .then(()=>{console.log("Database connection successful");
    })
    .catch((err)=>{
        console.log("Error Connecting DB");
        console.error(err);
        process.exit(1)
    })
}


module.exports = connectDB;