const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase';

async function connectDB() {
    try {
        await mongoose.connect(dbURI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
}
module.exports = connectDB;
