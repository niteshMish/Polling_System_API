const mongoose = require("mongoose");
const Question = require("../model/question");
const Option = require('../model/options'); 



module.exports.create =  async function(req , res){
    try{
        let option =  await Option.find({
            description:req.body.description,
            optionOf:req.params.id
      });
        if(option.length == 0){
            let o = await Option.create({
                description:req.body.description,
                optionOf:req.params.id
            });
            Question.findById(req.params.id).exec(function(err , que){
               que.optionsList.push(o._id);
                que.save();
            })
            return res.status(200).json( {
              message:"option has created successfully",
              data:o
          })
        } else{
          return res.status(200).json( {
              message:"option has  already created ",
              
          })
        }
    }catch(err){
         return res.ststus(403).json({
             message:"Error in creating option"
         });
    }
}
module.exports.addVote =  async function(req, res){
   
    let option = await Option.findById(req.params.id);
    option.optionCanBeDeleted = false;
    let question = await Question.findById(option.optionOf);
    question.questionCanBeDeleted = false;
    let curr_vote_count =  await option.votes;
    option.votes = await  curr_vote_count+1;
    await question.save();
    await option.save();
        option = await Option.findById(req.params.id);

        return res.status(200).json({
        message:" option voted successfully  incremented",
        data:option
    })

} 
module.exports.delete =  async function(req, res){

   
    let option = await Option.findById(req.params.id);
    if(option.optionCanBeDeleted){
        
        let   queId =  await option.optionOf;
        await  option.remove(); 
        let que =  await Question.findByIdAndUpdate(queId, { $pull: {optionsList: req.params.id}});
        return res.status(200).json({
            messsage : "option  deleted successfully"
        })
    }else{
        return res.status(200).json({
            messsage : "option can not be deleted it has vote"
        })

    }
} 