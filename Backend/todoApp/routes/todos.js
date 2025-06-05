const express  = require("express");
const router = express.Router();

//import controller
const {createTodo} = require("../controllers/createTodo");
const {getTodo} = require("../controllers/getTodo");
const {findOneTodo} = require("../controllers/findOneTodo")
const {updateTodo} = require("../controllers/updateTodo")

//define APi routes
router.post("/createTodo", createTodo);
router.get("/getTodo",getTodo);
router.get("/findOneTodo/:id",findOneTodo);
router.put("/updateTodo/:id",updateTodo);

module.exports = router;