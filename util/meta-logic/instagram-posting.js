const axios = require('axios')



const base_graph_url = `https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/`;


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









module.exports = {get_instagram_creation_id}


