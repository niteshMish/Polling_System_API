const mongoose = require('mongoose');


const OptionsSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    votes:{
          type:Number,
           default:0
    },
    optionCanBeDeleted:{
        type:Boolean,
        default:true
    },
    optionOf:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }
   
   },{
    timestamps:true
} 
)

const Option = mongoose.model('Option', OptionsSchema);
module.exports = Option; 