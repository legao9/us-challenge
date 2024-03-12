const TodoList = require("../models/todoList")
exports.createTodoList=(req, res)=>{
    console.log("TODOS__",req.body)
    try{
        const response = new TodoList({task:req.body.todos,challengeId:req.body.challengeId})
        response.save()
        res.send({response, message:"success"})
    }catch(e){
        res.send({message:"error", e})
    }
}

exports.getTodoByChallengeId= async (req, res)=>{
    try{
        const response = await TodoList.findOne({challengeId:req.params.challengeId})
        if(response){
            res.send({status:200, response})
        }
        
    }catch(e){
        res.send({message:"error", e})
    }
}
//this some other kind of error, Yes