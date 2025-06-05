const bcrypt = require('bcrypt');
const user = require('../Models/userSchema');
const jwt = require('jsonwebtoken'); // Import if you plan to use JWT for authentication
require('dotenv').config(); // Ensure you have dotenv configured to access environment variables
 
// Signup handler
const signup = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;
        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            role: role || 'visitor', // Default to 'visitor' if no role is provided
        }); 
        // Save user to the database
        await newUser.save();
        res.status(200).json({ message: "User created successfully" });
         
    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        // Find user by email
        const existingUser = await user.find({email:email});
        
        if (!existingUser || existingUser.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, existingUser[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        // If login is successful, return user data (excluding password)
        let token = jwt.sign({ id: existingUser[0]._id, email: existingUser[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.token = token; 
        user.password = undefined; // Remove password from the response
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 3600000 // 1 hour
        });
        res.status(200).json({
            message: "Login successful",
            user: {
                id: existingUser[0]._id,   
                name: existingUser[0].name,
                email: existingUser[0].email,
                role: existingUser[0].role,
                token: token // Include the token in the response
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { signup, login };