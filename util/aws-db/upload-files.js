
const AWS = require('aws-sdk')

const upload_video_file_s3 = async(file,bucketName) =>{
    try {
            AWSS3_BUCK_NAME
        console.log(process.env.AWSS3_ACCESS,process.env.AWSS3_SECRET)
        const s3 = new AWS.S3({
            credentials:{
                accessKeyId : process.env.AWSS3_ACCESS,
                secretAccessKey : process.env.AWSS3_SECRET
            }
        })

        const newFileName = `vid_${Date.now().toString()}.${file.mimetype.split('/')[1]}`

        const params ={
            Bucket:bucketName,
            Key: newFileName,
            Body: file.data,
            ContentType: file.mimetype, // Add the correct Content-Type
        }
       return new Promise((resolve,reject)=>{
        s3.upload(params,{},(err,data)=>{
            if(err){
                console.error(err)
                reject(err);

            }
            else{
                console.log(data)
                resolve(data)
            }
        })
       })
        
    }catch(error){
        console.error(error)

    }

}

module.exports = {upload_video_file_s3}