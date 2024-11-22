const axios = require('axios');



//base url. keep this here and adjust as the graph api changes so there is no need to adjust in each function.
const base_graph_url = `https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/`;

//step 1
const get_instagram_creation_id = async (instagram_id,access_token, media_url,caption,content_type ="") =>{

    try{

    //Create video container
    if(content_type == "reel"){
   
      const url = base_graph_url+`${encodeURIComponent(insta_id)}/media?media_type=REELS&video_url=${encodeURIComponent(media_url)}&caption=${encodeURIComponent(caption)}&access_token=${encodeURIComponent(access_token)}`;
     
    }
    //create photo container
    else{
        var url =`https://graph.facebook.com/v19.0/${insta_id}/media?image_url=${media_url}&caption=${caption}&access_token=${process.env.CURRENT_LONG_TOKEN}`
    }
   
    const response = await axios.post(url)
  
    const creation_id = response.data.id;
   
    return creation_id;

    }catch(error){
        console.error("Error in get_creation_id: " + error + "\n Response data: " + response.data );
        return false
    } 


}   

//nested in step 2
const get_instagram_creation_id_status = async (access_token,creation_id) => {
    const response = await axios.get(

        base_graph_url + `${creation_id}`,
      
      { params: { access_token: accessToken, fields: 'status_code' } }
    );
   
        console.log(response.data.status_code)
    return response.data.status_code;
};

//Check if an instagram creation id (post container) is ready to be posted
//Only needed for reels. Photo containers are ready immediatley
//step 2
const creation_id_wait_for_ready = async (creation_id,access_token,instagram_id) => {

    return new Promise(async (resolve, reject) => {
        var status = null
        var counter =0
        var start_time = Date.now()
        try {
            
       
    
        while(status != "FINISHED"){
        
            
            status =  await get_instagram_creation_id_status(access_token, creation_id);
            console.log("Checked: "+  ++counter)
            if(status == "FINISHED"){
                resolve(true);
            }
    
            if(status == "ERROR"){
                console.error("Error in container, skipping: ");
                resolve(false);
             
            }
        
            
            await new Promise((p) =>setTimeout(p,10000))
            }
            
        } catch (error) {
            console.error(error);
            reject(error);
        }
        
    })
  
    
}

//step 3
const instagram_upload = async(insta_id,creation_id,access_token) =>{
    return new Promise(async (resolve, reject) => {
        
        const creation_id_ready = await creation_id_wait_for_ready(creation_id)
        if (!creation_id_ready) {
            console.error("Creation id status = error. Creation id: " + creation_id)
            reject(false)
        }
  
     try{ 
    const url = base_graph_url + `${insta_id}/media_publish?creation_id=${creation_id}&access_token=${access_token}`
    const response = await axios.post(url);
    console.log("Instagram Post Success: "+ JSON.stringify(response.data))
    resolve(response.data)
     }catch(err){
      console.error("Instagram Posting Error");
      reject(err)
  
     }
    })  
}

//post functions wrapped
//acts as controller to all the steps of the posting process
const post_to_instagram = async (instagram_id, access_token, media_url, caption, content_type = "") => {

    return new Promise(async (resolve, reject) => {
        try {
            const creation_id = await get_instagram_creation_id(instagram_id, access_token, media_url, caption, content_type);
            const post_data = await instagram_upload(creation_id);
            resolve(post_data);
            
        } catch (error) {
            console.error("post_to_instagram error: " +error)
            reject(error);
        }
        
    })
   

    
}
  











module.exports = {post_to_instagram}


