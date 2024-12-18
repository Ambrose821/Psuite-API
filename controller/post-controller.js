const axios = require('axios')
const {edit_post, create_post} = require('../models/Posts/post-mapper')
const {upload_file_s3} = require('../util/aws-db/upload-files')
const {file_type_check} = require('../util/file_handleing/file-type-check')



const upload_draft = async (req,res,next) =>{

    try{
        let  {caption,platforms} = req.body;
        const files = Object.values(req.files);
        
        let media_type = 'none';
        if(files.length >1){
            media_type = 'multi';

        }else if(files.length == 1){
             media_type = file_type_check(files[0]);
        }
        
        const media = []

        //Upload files to s3 and get public URLs
        for(let i =0; i <files.length; i++){
            media.unshift(await upload_file_s3(files[i],process.env.AWSS3_BUCK_NAME))
        }

        platforms = JSON.parse(platforms)

        //Mapper Functionality
        const new_post = await create_post(caption,media,media_type,platforms)
        return res.status(200).json({post: new_post})
        
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err});
    }


}

const edit_draft = async (req,res,next)=>{
    
    try{
        let {id,caption,media, platforms, media_type} = req.body;
        
           
        media =JSON.parse(media)
        platforms =JSON.parse(platforms)

        const new_post = await edit_post(id,caption,media,platforms,media_type);
       return res.status(200).json({post: new_post});
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err})
    }


}

module.exports = {upload_draft, edit_draft}