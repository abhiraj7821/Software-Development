const mongoose = require('mongoose');

exports.comments = new mongoose.Schema({
    comment:{
        type:String,
        require:true,
        maxLength:200,
    },
    createdAt:{
        type:Date,
        require:true,
        default:Date.now(),
    },
    updatedAt:{
        type:Date,
        require:true,
        default:Date.now(),
    }
})