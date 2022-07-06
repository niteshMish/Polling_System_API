const mongoose = require("mongoose");
const Question = require("../model/question");
const Option = require('../model/options'); 

module.exports.home = function(req , res){
    
    return res.status(200).json( {
        message:" Welcome mission started"
    });
}

module.exports.create =  async function(req , res){
    try{
        let question =  await Question.find({description:req.body.description});
       if(question.length == 0){
          let q = await Question.create(req.body);
          return res.status(200).json( {
            message:"question created successfully",
            data:q
        })
      } else{

        return res.status(200).json( {
            message:"question has already created ",
         })
    }

    }catch(err){
        return res.status(409).json({
            message:" Error in creating question"
        });
    }
   
     
}
module.exports.show = function(req, res){
    try{
        Question.findById(req.params.id)
       .populate('optionsList')
       .exec(function(err , que){
        return res.status(200).json({
            message:"question show is ready",
            data:que,
            options:que.optionsList
        })
    })

    }catch(err){
        return res.status(403).json({
           message:"Error in showing question please check it " 
        });
    }
    
} 
module.exports.delete =  async function(req, res){
    try{
        let que  = await Question.findById(req.params.id);
        if(que && que.questionCanBeDeleted){
          for( opt of que.optionsList){
                     let option = await Option.findById(opt);
                     await option.remove();
           }
          await que.remove();  
        }

       if(! que.questionCanBeDeleted){
        return res.status(200).json( {
            message:"question  can't be deleted  its option has some vote "
        })   

       }
     return res.status(200).json( {
          message:"question deleted successfully"
      })   

    }catch(err){
        return res.status(409).json({
            message:"Error in deleting question"
        })
    }
     
} 