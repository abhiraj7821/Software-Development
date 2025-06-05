const express = require("express")
const router = express.Router();


const {createPost} = require('../Controllers/createPost')

router.post("/createPost",createPost);

module.exports = router;