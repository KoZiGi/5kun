let fs = require('fs');
let multer = require('multer');
let path = require('path');
let storage = multer.diskStorage({
    destination:path.join(__dirname, '../../frontend/assets/uploads/'),
    filename:(req,file,cb)=>{
        let filename = Date.now()+'-'+file.originalname;
        cb(null, filename);
    }
})
let upload = multer({storage:storage});
let Router = require('express').Router();

Router.post('/', upload.single('file'), (req,res)=>{
    try{
        res.status(200).send(req.file);
    }
    catch (err){
        res.status(500).send(err);
    }
})
Router.delete('/:filename', (req,res)=>{
    fs.rm(path.join(__dirname, '../frontend/assets/uploads/'+req.params.filename), (err)=>{
        if (err) res.status(500).send("Szerverhiba");
        else res.status(200).send("Successful deletion!");
    });
})
module.exports = {Router, upload};