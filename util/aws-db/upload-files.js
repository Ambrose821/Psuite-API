
const AWS = require('aws-sdk')

const upload_file_s3 = async(file,bucketName) =>{
    return new Promise((resolve,reject)=>{
    try {
          
        console.log(process.env.AWSS3_ACCESS,process.env.AWSS3_SECRET)
        const s3 = new AWS.S3({
            credentials:{
                accessKeyId : process.env.AWSS3_ACCESS,
                secretAccessKey : process.env.AWSS3_SECRET
            }
        })

        const newFileName = `media_${Date.now().toString()}.${file.mimetype.split('/')[1]}`

        const params ={
            Bucket:bucketName,
            Key: newFileName,
            Body: file.data,
            ContentType: file.mimetype, // Add the correct Content-Type
        }
      
        s3.upload(params,{},(err,data)=>{
            if(err){
                console.error(err)
                reject(err);

            }
            else{
                console.log(data)
                resolve(data.Location)
            }
        })
      
        
    }catch(error){
        console.error(error)
        reject(error)

    }
})

}




module.exports = {upload_file_s3}