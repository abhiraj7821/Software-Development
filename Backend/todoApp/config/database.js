const mongoose = require("mongoose");

require("dotenv").config();

const uri = "mongodb+srv://user1:plmzaq123@cluster1.0ogxadl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"

const dbConnect = () => {
    mongoose.connect(uri)
    .then(() => console.log("DB ka Connection is Successful"))
    .catch( (error) => {
        console.log("Issue in DB Connection");
        console.error(error.message);
        //iska matlab kya h ?
        process.exit(1);
    } );
}

module.exports = dbConnect;