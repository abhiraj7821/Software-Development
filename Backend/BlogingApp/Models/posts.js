const mongoose = require('mongoose');

const posts = new mongoose.Schema({
    postTitle:{
        type:String,
        require:true,
        maxLength:200,
    },
    postDescription:{
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

module.exports = mongoose.model("posts",posts);