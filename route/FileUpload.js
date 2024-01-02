const express=require("express");
const router=express.Router();

const {localFileUpload,fileUpload}=require("../controller/fileUpload");

router.post("/localFileUpload",localFileUpload);

router.post("/fileUpload",fileUpload);

module.exports=router;