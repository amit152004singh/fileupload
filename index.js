const express=require("express");
const app=express();

//add .env config

require("dotenv").config();
const PORT=process.env.PORT||3000;

//add database

require("./config/database").connect();

require("./config/cloudinary").cloudinaryConnect();

//get middleware

app.use(express.json());

const fileupload=require('express-fileupload');
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//mount the route

const Upload=require('./route/FileUpload');
app.use('/api/v1/upload',Upload);

//listen to port

app.listen(PORT,()=>{
    console.log(`the server is running at this port = ${PORT}`)
})


