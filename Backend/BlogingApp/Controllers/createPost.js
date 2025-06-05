const posts = require('../Models/posts')

exports.createPost = async (req,res)=>{
    try{
        //extract title and desxcription from reauest body
            const {postTitle,postDescription} = req.body;
            //create a new Todo Obj and insert in DB
            const response = await posts.create({postTitle,postDescription});
            //send a json response with a success flag
            res.status(200).json(
                {
                    success:true,
                    data:response,
                    message:'Entry Created Successfully'
                }
            );
    }
    catch(err){
        console.log(err);
        res.send(500).json({
            sucess:false,
            message:"Could not create post"
        })
    }
}