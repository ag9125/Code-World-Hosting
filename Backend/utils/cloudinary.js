const cloudinary =require('cloudinary').v2

const cloudinaryUplaod = async (file,folder,quality=50,height)=>{
    try {
        const options = {
           quality,resource_type:"auto",folder,use_filename:true,
            chunk_size: 6000000, // 6MB chunks (for large files)
        }
        if(height) options.height = height
        const uploadfile = await cloudinary.uploader.upload(file.tempFilePath,options)
        return uploadfile;
        
    } catch (error) {
        console.log("error in Cloudinary Connect")
        console.log(error)
        throw error;
    }
}
module.exports = cloudinaryUplaod