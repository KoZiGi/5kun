let fs = require('fs');
let multer = require('multer');
let path = require('path');
let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname, '../frontend/uploads/'));
    },
    filename:(req,file,cb)=>{
        let filename = Date.now()+'-'+file.originalname+path.extname(file.originalname);
        cb(filename);
    }
})
let upload = multer({storage:storage});
let Router = require('express').Router();

Router.post('/', upload.single('file'), (req,res)=>{
    res.status(200).send(req.file);
})
Router.delete('/:filename', (req,res)=>{
    fs.rm(path.join(__dirname, '../frontend/uploads/'+req.params.filename), (err)=>{
        if (err) res.status(500).send("Szerverhiba");
        else res.status(200).send("Successfull deletion!");
    });
})
module.exports = {Router, upload};