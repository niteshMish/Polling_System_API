const mongoose = require("mongoose");
const Question = require("../model/question");
const Option = require('../model/options'); 

module.exports.home = function(req , res){
    
    return res.status(200).json( {
        message:"mission started"
    });
}

module.exports.create =  async function(req , res){
    console.log(req.body);
      let question =  await Question.find({description:req.body.description});
      console.log("que" , question);
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
     
}
module.exports.show = function(req, res){
    console.log(req.params);
    
    Question.findById(req.params.id)
    .populate('optionsList')
    .exec(function(err , que){
        return res.status(200).json({
            message:"question show is ready",
            data:que,
            options:que.optionsList
        })
    })
} 
module.exports.delete =  async function(req, res){
      let que  = await Question.findById(req.params.id);
      if(que){
        for( opt of que.optionsList){
                   let option = await Option.findById(opt);
                   await option.remove();
         }
        await que.remove();  
      }
    
    


       
    return res.status(200).json( {
        message:"question deleted successfully"
    })   
} 