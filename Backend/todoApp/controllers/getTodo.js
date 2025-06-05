//import th model
const Todo = require("../models/Todo");


exports.getTodo = async (req,res)=>{
    try{
        const response= await Todo.find()
        res.status(200).json(
            {
                sucess:true,
                data:response,
                message:"These are all todos present in DB"
            }
        )
    }
    catch(err){
        res.status(500).json({
            sucess:false,
            message:err,
        })
    }
}