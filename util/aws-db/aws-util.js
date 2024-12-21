const get_aws_object_key = (web_url) =>{

   const key = web_url.split('/')[3];

    return key;
}






module.exports = {get_aws_object_key}