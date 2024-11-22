const axios = require('axios')

const post_to_instagram = async (req, res, next) => {
    //TODO A user may have the option to instantly post to a platform.
    //In this case a file recieved will have to be uploaded to AWS S3 bucket so that there is
    // a public url for the meta graph api and other social media api's to use

    //Or

    //Video already exists in S3 because and editor and customer have been colaborating on it through the system.
    //In this case there will be some database entity which contains the posting url as a field.

}