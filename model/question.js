const mongoose = require('mongoose');


const QuestionsSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    optionsList:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Option'
    }]
   
   },{
    timestamps:true
} 
)

const Question = mongoose.model('Question',QuestionsSchema);
module.exports = Question; 