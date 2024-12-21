const {DeleteObjectsCommand,S3Client,S3ServiceException, waitUntilObjectNotExists} = require('@aws-sdk/client-s3')

const delete_file_s3 = async (bucketName,keys) =>{

    return new Promise(async (resolve,reject)=>{

        try{

            const client = new S3Client({
                region : process.env.AWSS3_REGION,
                credentials:{
                    accessKeyId: process.env.AWSS3_ACCESS,
                    secretAccessKey: process.env.AWSS3_SECRET
                }
            });
            const {Deleted} = await client.send(
                new DeleteObjectsCommand({
                    Bucket: bucketName,
                    Delete: {
                        Objects : keys.map((k)  =>({Key: k}))
                    },
                }),
            );

            for(const key in keys){
                await waitUntilObjectNotExists(
                    {client},
                    {Bucket: bucketName, Key: key},
                );
            }

            console.log(
                `Successfully deleted ${Deleted.length} objects from S3 bucket. Deleted objects:`,
              );

            console.log(Deleted.map((d) => ` • ${d.Key}`).join("\n"));
            resolve( `Successfully deleted ${Deleted.length} objects from S3 bucket. Deleted objects:`)

        }catch(err){
            console.error("Error deleting S3 Object: " + err);
            reject(new Error("Error deleting S3 Object: " + err))

        }   


    })

    


}

module.exports = {delete_file_s3}