const express = require('express');
const router = express.Router();

// Controller functions || Route Handlers

const {localFileUpload,imageUpload} = require('../controllers/FileController');
// imageUpload,videoUpload,imageReduceUpload,

// Image Upload Route
router.post('/upload/image', imageUpload);
// // Video Upload Route
// router.post('/upload/video', videoUpload);
// // Image Reduce Upload Route
// router.post('/upload/image/reduce', imageReduceUpload);
// Local File Upload Route
router.post('/upload/local', localFileUpload);

// Export the router
module.exports = router;