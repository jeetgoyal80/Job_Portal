const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:{
        type:[String],
       
    },
    locations:{
        type:String,
        required:true
    },
    jobtype:{
        type:String,
        required:true
    },
    experienceLevel:{
        type:Number,
        required:true

    },
    salary:{
        type:Number,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application',
        
    }],

},{timestamps:true})
module.exports = mongoose.model('Job',jobSchema);  