const mongoose = require('mongoose');


const File = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    cloudinaryId:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model('File', File);