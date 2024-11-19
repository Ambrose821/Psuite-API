const axios = require('axios')
const response = require('express')

const base_graph_url = `https://graph.facebook.com/${process.env.GRAPH_API_VERSION}/`;






/*
 Takes a short term facebook graph api token (1-hour), a facebook developers app id, and app secret.
 Exhanges short term token for long term token(60-days).

 returns new token and time until token expirey
*/
const get_graph_long_token = async (short_token,app_id,app_secret) => {
    const url = base_graph_url+ `access_token?grant_type=fb_exchange_token&client_id=${app_id}&client_secret=${app_secret}&fb_exchange_token=${short_token}`

    try{
       
      const  response = await axios.get(url)
          
      //console.log(response.data.access_token)
      return({token: response.data.access_token, timer: response.data.expires_in})
      
      }
      catch(err){
        console.error()
          return({token: false, timer: false})
          
      }

}


//Takes a facebook page id which can be obtained manually from any business facebook page, or through OAuth services.
//If an instagram account is associated to that page, the function will return that accounts instagram id which will allow graph api calls for that account
const get_instagram_id = async(facebook_page_id, access_token) =>{
   
    const url = base_graph_url + `${facebook_page_id}?fields=instagram_business_account&access_token=${access_token}`
    try{

        const response = await axios.get(url);

        const instagram_id = response.data.instagram_business_account.id;

        return instagram_id;

    }catch(error){
        console.error("Error in get_instagram_id(): " + error + "\n Response data: " + response.data) 
        return false;
    }
}


module.exports = {get_graph_long_token, get_instagram_id}