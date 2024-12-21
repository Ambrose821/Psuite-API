const mongoose = require('mongoose');


const PLATFORM_ENUM = ['instagram','tiktok','facebook','youtube'];

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        default: 'untitled'
    },

    caption: {
        type: String,
        default: null
    },
    media_type:{
        type: String,
        required: true,
        enum: ['image','video','multi','none']
    },
    media:{
        type: [String],
        default: [],
    },
    date_created :{
        type: Date,
        default:Date.now
    },

    date_scheduled: {
        type: Date,
        deafault:null
    },

    status:{
        type: String,
        enum: ['posted','scheduled','draft','rejected'],
        default: 'draft'
    },

    previous_versions: 
        {type: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
        default: []
        },

    platforms:
    {
        type:[String],
        enum: PLATFORM_ENUM,
        default:[],
        
    },

    instructions:{
        type: String,
        default:null
    }


})


module.exports = mongoose.model('Post',PostSchema);