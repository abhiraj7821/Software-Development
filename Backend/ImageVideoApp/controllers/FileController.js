const file = require('../models/File');
require('dotenv').config();
const configureCloudinary = require('../config/cloudinary');
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const file = req.files.file;
        const uploadPath = __dirname + '/uploads/' + file.name;
        console.log('File upload path:', uploadPath);
        

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err)=> {
            if (err) {
                return res.status(500).send(err);
            }
        });

        res.send('File uploaded to ' + uploadPath);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}



exports.imageUpload = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // Image Data
        const {name,tags,email} = req.body;
        const image = req.files.image;

        // Validate image type
        const validImageTypes = ['jpeg', 'png', 'jpg'];
        const imageType = image.mimetype.split('/')[1];
        if (!validImageTypes.includes(imageType)) {
            return res.status(400).send('Invalid image type. Only jpeg, png, and jpg are allowed.');
        }

        // Upload image to Cloudinary
        console.log('Uploading image to Cloudinary:', image.tempFilePath);

        cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
        });

        const result = await cloudinary.uploader.upload(image.tempFilePath);

        console.log('Image uploaded to Cloudinary:', result);

        // Insert image data into the database
        const newImage = new file({
            name: name,
            tags: tags,
            email: email,
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id
        });
        await newImage.save();

        res.status(201).json({
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}
