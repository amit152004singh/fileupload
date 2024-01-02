const File=require('../models/file');

const cloudinary=require('cloudinary');

exports.localFileUpload= async (req,res)=>{
    try{
        //get the file
        const file=req.files.file;
        console.log(file);

        //set the path where file should be saved

        let path=__dirname+'/files/'+Date.now()+`.${file.name.split('.')[1]}`;

        //move the file to desired path
        file.mv(path,(err)=>{
            console.log(err);
        });

        res.json({
            success:true,
            message:'local fileupload done',
        })
    }
    catch(err){
        console.log(err);
        req.json({
            success:false,
            message:'there was an error',
        })
    }
}





async function cloudinaryUpload(file,folder){
    const option={folder};
    option.resourse_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,option);
}

function dosupportedFileType(file,filetypes){
    return filetypes.includes(file);
}





exports.fileUpload= async (req,res)=>{
    try{
        const {name,email,tags}=req.body;

        const file=req.files.file;

        const supportedFileType=['jpeg','jpg','png'];

        const fileType=`${file.name.split('.')[1]}`;
        console.log('hii');
        if(!dosupportedFileType(fileType,supportedFileType)){
            return res.status(400).json({
                success:false,
                message:'file type not supported',
            })
        }
        console.log('hii');
        const response=await cloudinaryUpload(file,"amitsingh");

        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        return res.status(200).json({
            success:true,
            message:'file uploaded successfully to cloudinary',
        })

    }
    catch(err){

        console.log(err);
        return res.status(400).json({
            success:false,
            message:'something went wrong',
        })
    }
}





exports.videoUpload= async (req,res)=>{
    try{
        const {name,email,tags}=req.body;

        const file=req.files.file;


        const supportedFileType=['mp4','mov'];

        const fileType=`${file.name.split('.')[1]}`;
        console.log('hii');

        if(!dosupportedFileType(fileType,supportedFileType)){
            return res.status(400).json({
                success:false,
                message:'file type not supported',
            })
        }

        console.log('hii');
        const response=await cloudinaryUpload(file,"amitsingh");

        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        return res.status(200).json({
            success:true,
            message:'file uploaded successfully to cloudinary',
        })


    }
    catch(err){

        console.log(err);
        return res.status(400).json({
            success:false,
            message:'something went wrong',
        })
    }
}