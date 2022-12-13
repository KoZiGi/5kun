const express=require('express');
const router=express.Router();
const sha1=require('sha1');
const config=require('../config.js');
var mysql=require('mysql');
var pool=mysql.createPool(config.dbconfig);
const moment=require('moment');

//list all users
router.get('/all', (req,res)=>{
    pool.query('SELECT * FROM `users`', (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

//registration
router.post('/reg', (req,res)=>{
    let user={
        'email': req.body.email,
        'name': req.body.name,
        'passwd': req.body.passwd1,
        'phone': req.body.phone,
        'address': req.body.address,
        'filename': req.body.filename,
        'reg': moment(new Date()).format('YYYY MM DD, hh:mm:ss'),
        'last': "",
        'status': 1
    }
    console.log(user);
    pool.query('INSERT INTO `users`(`name`, `email`, `password`, `phone`, `address`, `filename`, `reg`, `last`, `status`) VALUES (?,?,?,?,?,?,?,?,?)', [user.name,user.email,sha1(user.passwd),user.phone,user.address,user.filename,user.reg,user.last,user.status], (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })

})

module.exports=router;