const axios = require('axios')
const {edit_post, create_post} = require('../models/Posts/post-mapper')

const upload_draft = async (req,res,next) =>{
    const  {caption, media_type ,platforms} = req.body;
    const files = req.files;

    const media = [];

    try{
    files.array.forEach(async (file) => {
        let url = await upload_file_s3(req.files.video,process.env.AWSS3_BUCK_NAME)
        media.unshift(url);
        
    });

    //Mapper Functionality
    const new_post = create_post(caption,media,media_type,platforms)
    return res.status(200).body(new_post)
    
    }catch(err){
        return res.status(500).body(err);
    }


}

const edit_draft = async (req,res,next)=>{
    const {id,new_caption,media, platforms,media_type} = req.body;
    
    try{
        const new_post = await edit_post(id,new_caption,media,platforms,media_type);
        res.status(200).body(new_post);
    }catch(err){
        res.status(500).body(err)
    }


}

module.exports = {upload_draft, edit_draft}