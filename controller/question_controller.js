const mongoose = require("mongoose");
const Question = require("../model/question");
const Option = require('../model/options'); 

module.exports.home = function(req , res){
    
    return res.json(200 , {
        message:"mission started"
    });
}

module.exports.create =  async function(req , res){
      let question =  await Question.find({descrition:req.body.description});
      if(question.length == 0){
          let q = await Question.create(req.body);
      } 
      return res.json(200 , {
          message:"question created successfull",
          data:q
      })
}
module.exports.show = function(req, res){
    Question.findById(req.params.id)
    .populate('optionsList')
    .exec(function(err , que){
        return res.json(200 , {
            message:"question show is ready",
            data:que
        })
    })
} 
module.exports.delete = function(req, res){
    Question.findById(req.params.id).exec(function(err , que){
       for( opt of que.optionsList){
           Option.de
       }
    })
} 