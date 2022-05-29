const mongoose = require("mongoose");
const Question = require("../model/question");
const Option = require('../model/options'); 



module.exports.create =  async function(req , res){
    console.log("req.params",req.params);
    console.log( "req.body",req.body);
    console.log("req.query",req.query);
    
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
              console.log("que---------->>>>>>",que);
              que.optionsList.push(o._id);
              que.save();
          })
          return res.status(200).json( {
            message:"option has created successfully",
            data:o
        })
      } else{
        return res.status(200).json( {
            message:"option has  already created  successfully",
            
        })
      }

      
}
module.exports.addVote=  async function(req, res){
   let option = await Option.findById(req.params.id);
   let curr_vote_count =  await option.votes;
   option.votes = await  curr_vote_count+1;
   option.save();
    option = await Option.findById(req.params.id);

   return res.status(200).json({
       message:" option voted successfully  incremented",
       data:option
   })

} 
module.exports.delete =  async function(req, res){
   console.log("params id",req.params.id);
    // let option =  await Option.findById(req.params.id);
    // let que  = await  Question.findById(option.optionOf);
    // let newOptionList = await que.optionsList.filter((opt)=>{
    //       if( opt  == option){
    //           return false;
    //       }else{
    //           return true;
    //       }
    // });
    // console.log("newOPtionList",newOptionList);
    // que.optionsList =  await newOptionList;
    // await que.save();
    // await option.remove();
    let option = await Option.findById(req.params.id);
    console.log("options------>>>",option);
    let   queId =  await option.optionOf;
    await  option.remove(); 
    let que =  await Question.findByIdAndUpdate(queId, { $pull: {optionsList: req.params.id}});
    return res.status(200).json({
         messsage : "option  deleted successfully"
     })
} 