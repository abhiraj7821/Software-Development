const Todo = require('../models/Todo');

exports.updateTodo = async (req,res)=>{
    try{

        // get id
        const {id} = req.params;
        const {title,description} = req.body;

        const todo = await Todo.findByIdAndUpdate({_id:id},{title,description},{updatedAt:Date.now()})
        res.send(200).json({
            sucess:true,
            data:todo,
            message:"Todo update sucessful",
        })
    }
    catch(err){
        res.send(500).json({
            sucess:false,
            message:`data Updation Error with ${err}`
        })
    }
}