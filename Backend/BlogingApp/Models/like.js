const mongoose = require('mongoose');

exports.like = new mongoose.Schema({
    like:{
        type:Boolean,
        require:true,      
        default:false,  
    },
    createdAt:{
        type:Date,
        require:true,
        default:Date.now(),
    },
    updatedAt:{
        typeof:Date,
        require:true,
        default:Date.now(),
    }
})