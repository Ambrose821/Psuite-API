const axios = require('axios')
const {edit_post, create_post} = require('../models/Posts/post-mapper')
const {upload_file_s3} = require('../util/aws-db/upload-files')
const {file_type_check, batch_file_type_check,batch_url_file_type_check} = require('../util/file_handleing/file-type-check')
const { RolesAnywhere } = require('aws-sdk')



const upload_draft = async (req,res,next) =>{

    try{
        let  {title, caption, media, platforms,scheduled_at} = req.body;
     
        if(typeof platforms === 'string'){
            platforms = JSON.parse(platforms)
        }
        if(typeof media === 'string'){
            media = JSON.parse(media)
        }

        
        const media_type = batch_url_file_type_check(media);

        //Mapper Functionality
        const new_post = await create_post(title,caption,media,media_type,platforms,scheduled_at)
        return res.status(200).json({post: new_post})
        
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err.toString()});
    }


}


//dont save previous version of post

const edit_draft = (nest_post) =>{
    return async (req,res,next)=>{
   

    
    try{
        let {id,title,caption,media, platforms,scheduled_at} = req.body;
        
        if(scheduled_at){
            scheduled_at = new Date(scheduled_at);
        }
        
         if(typeof media === 'string'){
            console.log('Type of media is string')
            media =JSON.parse(media)
         }  
        
         if(typeof media === 'string'){
            platforms =JSON.parse(platforms)
         }

         const media_type = batch_url_file_type_check(media);
         
        

        const new_post = await edit_post(id,title,caption,media,platforms,media_type,scheduled_at,nest_post);
       return res.status(200).json({post: new_post});
    }catch(err){
        console.log(err)
        return res.status(500).json({error: err.toString()})
    }


    }
}

//save previous version of posts in collections



const request_edit = async (req,res,next) =>{
    try{
        const {id, instructions,platforms, caption} = req.body;
        const files = Object.values(req.files);

        const media_type = batch_file_type_check(files);

        //The ?? handles default values for both null AND undefined variables. using id = "" as a default, for example, only handles undefined
        id = id ?? null;
        instructions = instructions ?? "";
        platforms = platforms ?? "";
        caption = caption ?? "";

        let post;

        if(!id){
            


        }


    }catch{

    }
}

module.exports = {upload_draft, edit_draft}