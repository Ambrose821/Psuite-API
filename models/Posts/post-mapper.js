var mongoose = require('mongoose');

var Post = require('./Post');


const create_post = async (caption, media_arr,media_type, platforms) => {
    return new Promise(async (resolve,reject) => {

        try{
            const post = new Post({
                caption: caption,
                media_type: media_type,
                media:media_arr,
                platforms: platforms
    
            })
            await post.save();
            resolve(post);
    
        }catch(err){
            console.error("Error in create_post: "+ err)
            reject(new Error(err));
        }
       

    })
    
    
}
//editor has made changes
const edit_post = async (id,new_caption = "",new_media_arr =[] ,new_platforms = [],new_media_type="") =>{
    return new Promise(async(resolve, reject) =>{

        try{
   
            const current_post = await Post.findById(id);
        
            if (!current_post) {
                console.error("Post not found with ID: " + id);
                return false;
            }
        
            const current_caption =current_post.caption
            const current_media =current_post.media;
            const current_type = current_post.media_type;
            const current_platforms = current_post.platforms;
        
            const old_post = new Post({
                caption: current_caption,
                media: current_media,
                media_type: current_type,
                platforms: current_platforms,
                status: 'rejected'
            })
        
            await old_post.save();
        
            current_post.status = "pending";
            current_post.media = (new_media_arr) ? new_media_arr : current_media;
            current_post.caption = (new_caption) ? new_caption: current_caption;
            current_post.media_type = (new_media_type) ? new_media_type: current_type;
            current_post.platforms = (new_platforms) ? new_platforms : current_platforms;
            current_post.previous_versions.push(old_post._id);
        
            await current_post.save();
            resolve(current_post);
        
        }catch(err){
            console.error("Error in edit_post: "+ err)
            reject(new Error(err));
        }
        

    })


}

module.exports = {edit_post,create_post}