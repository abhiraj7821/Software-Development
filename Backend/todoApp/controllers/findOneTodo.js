const Todo = require("../models/Todo");


exports.findOneTodo = async (req,res) =>{
    try{
        const {id} = req.params;

        const todo = await Todo.findById({_id:id});
        if(!todo){
            res.status(404).json({
                message:"todo not found"
            })
        }
        res.status(200).json({
            status:true,
            data:todo,
            message:"We got your todo",
        })
    }
    catch(err){
        res.status(500).json({
            sucess:false,
            message:err,
        })
    }
}