
const {upload_file_s3} = require("../util/aws-db/upload-files")
const upload_video_s3 = async(req,res,next) =>{

    try{
        if(req.files.video){ 
            const result = await upload_file_s3(req.files.video,process.env.AWSS3_BUCK_NAME)
            return res.status(201).json({
                message:"Success",
                body: result
            })
        }

    }catch(error){
        return res.status(500).json({
            message:
            
            "Error Uploading video to s3"
        })
    }

}

module.exports = {upload_video_s3}