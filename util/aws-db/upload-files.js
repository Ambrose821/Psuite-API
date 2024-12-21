
const {v4: uuidv4} = require('uuid')

const {PutObjectCommand,S3Client,S3ServiceException} = require('@aws-sdk/client-s3')


const upload_file_s3 = async(file,bucketName) =>{

    return new Promise(async (resolve, reject) =>{
        try{

            const client = new S3Client({
                region : process.env.AWSS3_REGION,
                credentials:{
                    accessKeyId: process.env.AWSS3_ACCESS,
                    secretAccessKey: process.env.AWSS3_SECRET
                }
                

            })

            const fileName = `${file.mimetype.split('/')[0]}_${Date.now()}_${uuidv4()}.${file.mimetype.split('/')[1]}`
            
            const command = new PutObjectCommand({
                Bucket: bucketName,
                Key: fileName,
                Body: file.data,
                ContentType: file.mimetype
            })

            const response = await client.send(command);

            
            console.log(response)
            
                
                const url = `https://${bucketName}.s3.${process.env.AWSS3_REGION}.amazonaws.com/${fileName}`
                resolve(url)
            
            

         }catch(err){
            console.error("AWS Upload Error:" +err)
            reject(err)

        }

    })

  
}





module.exports = {upload_file_s3}