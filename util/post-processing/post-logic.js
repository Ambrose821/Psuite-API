var mongoose = require('mongoose');

var Post = require('../../models/Post');


const create_post = async (caption, media_url,media_type) => {

    try{
        const post = new Post({
            caption: caption,
            media_type: media_type,
            media_url:media_url,
        })
        await post.save();
        return true;

    }catch(err){
        console.error("Error in create_post: "+ err)
        return false;
    }
   
    
}
//editor has made changes
const edit_post = async (id,new_caption = "",new_url ="",new_media_type="") =>{
    
try{
   
    const current_post = await Post.findById(id);

    if (!current_post) {
        console.error("Post not found with ID: " + id);
        return false;
    }

    const current_caption =current_post.caption
    const current_url =current_post.media_url;
    const current_type = current_post.media_type;

    const old_post = new Post({
        caption: current_caption,
        media_url: current_url,
        media_type: current_type,
        status: 'disapproved'
    })

    await old_post.save();

    current_post.status = "pending";
    current_post.media_url = (new_url) ? new_url : current_url;
    current_post.caption = (new_caption) ? new_caption: current_caption;
    current_post.media_type = (new_media_type) ? new_media_type: current_type;
    current_post.previous_versions.push(old_post._id);

    await current_post.save();
    return true;

}catch(err){
    console.error("Error in edit_post: "+ err)
    return false;
}


  



}
