const mongoose = require('mongoose');


const QuestionsSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    questionCanBeDeleted:{
        type:Boolean,
        default:true
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