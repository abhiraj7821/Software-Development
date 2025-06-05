const express = require('express')
const router=express.Router();


// Controllers

const {login,signup} = require('../Controllers/auth')

router.post('/login',login);
router.post('/signup',signup);

// Protected routes
const {auth,isStudent,isAdmin} = require('../Middlewares/auth');

router.get('/test',auth, (req, res) => {
    res.status(200).json({ message: "Test protected route accessed successfully" });
});

router.get('/student',auth,isStudent, (req, res) => {
    res.status(200).json({ message: "Welcome Student" });
});

router.get('/admin',auth,isAdmin, (req, res) => {
    res.status(200).json({ message: "Welcome Admin" });
});

module.exports = router;