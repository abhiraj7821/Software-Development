const cloudinary = require('cloudinary').v2;
require('dotenv').config();


exports.configureCloudinary = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET 
        });
        
        console.log('Cloudinary configured successfully');
    } catch (error) {
        console.error('Error configuring Cloudinary:', error.message);
    }
}

exports.getCloudinary = () => {
    return cloudinary;
}