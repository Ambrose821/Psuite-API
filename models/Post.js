const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    caption: {
        type: String,
        default: null
    },
    media_type:{
        type: String,
        required: true,
        enum: ['photo','video']
    },
    media_url:{
        type: String,
        default: null,
    },
    date_created :{
        type: Date,
        default:Date.now
    },
    status:{
        type: String,
        enum: ['posted','approved','pending','disapproved'],
        default: 'pending'
    },
    previous_versions: 
    {type: [
 { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    default: []}

})


module.exports = mongoose.model('Post',PostSchema);