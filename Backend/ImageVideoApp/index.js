const express = require('express');
const app = express();
require('dotenv').config();
const fileUpload = require('express-fileupload');

// Middleware
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome to Image and Video Processing API');
}
);

// Connect to the database
const connectDB = require('./config/database');
connectDB();



// Configure Cloudinary
const { configureCloudinary } = require('./config/cloudinary');
configureCloudinary();

// Import routes
const fileRoutes = require('./routes/fileRoutes');
app.use('/api/v1/files', fileRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});