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
        enum: ['image','video','multi','none','other']
    },
    media:{
        type: [String],
        default: [],
    },
    createdAt :{
        type: Date,
        default:Date.now
    },

    scheduledAt: {
        type: Date,
        deafault:null
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status:{
        type: String,
        enum: ['published','scheduled','draft','rejected'],
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
    },

    is_parent:{
        type: Boolean,
        default:true
    }


})


module.exports = mongoose.model('Post',PostSchema);