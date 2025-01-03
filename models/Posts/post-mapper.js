var mongoose = require('mongoose');

var Post = require('./Post');
const {delete_file_s3} = require('../../util/aws-db/delete-files')
const {get_aws_object_key} = require('../../util/aws-db/aws-util')


const create_post = async (title,caption, media_arr,media_type, platforms,scheduled_at =null) => {
    return new Promise(async (resolve,reject) => {

        try{

            if(scheduled_at){
                scheduled_at = new Date(scheduled_at);
            }

            const post = new Post({
                title:title,
                caption: caption,
                media_type: media_type,
                media:media_arr,
                platforms: platforms,
                scheduledAt: scheduled_at
    
            })
            await post.save();
            resolve(post);
    
        }catch(err){
            console.error("Error in create_post: "+ err)
            reject(new Error(err));
        }
       

    })
    
    
}

const detect_deleted_media = (curr_media_arr, new_media_arr) =>{
    let to_delete = [];
    for(let i =0; i <curr_media_arr.length; i++){
        console.log(new_media_arr.includes(curr_media_arr[i]))
        if(!new_media_arr.includes(curr_media_arr[i])){
            to_delete.push(curr_media_arr[i]);
        }

    }
    console.log(to_delete)
    return to_delete;
}
//editor has made changes
const edit_post = async (id,new_title,new_caption, new_media_arr ,new_platforms, new_media_type,new_scheduled_at, nest_post) =>{
    return new Promise(async(resolve, reject) =>{

        try{
   
            const current_post = await Post.findById(id);
        
            if (!current_post) {
                console.error("Post not found with ID: " + id);
                reject(new Error('No Post Objects Found for id:  '+ id));
            }
            const current_title =current_post.title
            const current_caption =current_post.caption
            const current_media =current_post.media;
            const current_type = current_post.media_type;
            const current_platforms = current_post.platforms;
            const current_date_scheduled = current_post.scheduledAt;


            let aws_to_delete = detect_deleted_media(current_media,new_media_arr);
            
            //console.log(aws_to_delete)
            //extract the aws object key from the aws media url
            

           //console.log(aws_to_delete)
            aws_to_delete = aws_to_delete.map(get_aws_object_key)

           // console.log(aws_to_delete)

            //delete files from s3 bucks if any
            if(aws_to_delete.length>0){
            
             await delete_file_s3(process.env.AWSS3_BUCK_NAME,aws_to_delete);
            }
            //Offers a choice as to whether or not a post will save the old post object version in its previous_versions collection
            if(nest_post){
        
                var old_post = new Post({
                    title:current_title,
                    caption: current_caption,
                    media: current_media,
                    media_type: current_type,
                    platforms: current_platforms,
                    scheduledAt:current_date_scheduled,
                    status: 'rejected',
                    is_parent: false

                })
            
                await old_post.save();
                current_post.previous_versions.push(old_post._id);
           }
        
            current_post.status = "draft";
            current_post.title =  new_title 
            current_post.media =  new_media_arr
            current_post.caption = new_caption
            current_post.media_type =  new_media_type
            current_post.platforms = new_platforms
            current_post.scheduledAt =  new_scheduled_at 
            current_post.updatedAt = Date.now();
            
            
        
            await current_post.save();
            resolve(current_post);
        
        }catch(err){
            console.error("Error in edit_post: "+ err)
            reject(new Error(err));
        }
        

    })


}
/*
*******************TODO HOW DO YOU WANNA DEAL WITH MULTIPLE POSTS USING THE SAME MEDIA URL***********************
*/
const delete_post = async (id) =>{

    return new Promise(async (resolve, reject) =>{

        try{
            const post = await Post.findById(id).lean()
            if(!post){
                resolve("No Post exists with id: "+id)
            }

            let media_arr = post.media;
        
            media_arr = media_arr.map(get_aws_object_key);
        
            if(media_arr.length >0){
                await delete_file_s3(process.env.AWSS3_BUCK_NAME,media_arr)
            }
        
            if(post.previous_versions.length > 0){
                for(let i = 0; i < post.previous_versions.length; i++){
                    await Post.deleteOne({_id: post.previous_versions[i]})
                }
                
            }
            await Post.deleteOne({_id: id});
            console.log("Deleted: " +id)
            resolve('Deleted: ' +id)
    }catch(err){
        console.error("Error deleting Post object: " + err);
        reject(new Error(err))
    }
    

    })
 
    
}

const get_scheduled_in_range = async (start_date, end_date) =>{

    return new Promise(async (resolve,reject) =>{
        console.log(start_date)
        console.log(end_date)
        try{
            const posts = await Post.find({
                scheduledAt:{
                    $gte: start_date,
                    $lte: end_date
                }
            }).lean()
            if(!posts){
                console.log(`No posts within the range ${start_date} and ${end_date}`)
          
            }
    
            resolve(posts)
    
    
        }catch(err){
            console.error('Error in get_scheduled_in_range'+err)
            reject(new Error(err))
        }

    })
  

}

const get_all_posts = async () =>{
    const posts = await Post.find({is_parent: true}).lean()
    return posts;
}

const get_post_by_id = async(id) =>{

    const post = await Post.findById(id).populate('previous_versions').lean()
    
    return post;

}



module.exports = {edit_post,create_post,get_all_posts,get_post_by_id,delete_post, get_scheduled_in_range}