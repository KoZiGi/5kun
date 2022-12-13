const express=require('express');
const router=express.Router();
const sha1=require('sha1');
const config=require('../config.js');
var mysql=require('mysql');
var pool=mysql.createPool(config.dbconfig);
const moment=require('moment');
const { route } = require('express/lib/application');

//login 
router.get('/log', (req,res)=>{
    let user={
        'email': req.body.email,
        'passwd': req.body.passwd
    }
    pool.query('SELECT * FROM `users` WHERE `email`=? AND `password`=?', [user.email, sha1(user.passwd)], (err,result)=>{
        if(err) res.status(500).send(err);
        else{
            if(result.length>0) res.status(200).send(result);
            else res.status(500).send(result);
        }
    })
})

//CRUD
    //INSERT ONE 
router.post('/:table', (req,res)=>{
    let table=req.params.table;
    let records=req.body;
    let fields=Object.keys(records);
    let values=Object.values(records);
    let str= null;
    let str2= "id";
    str2 = Object.keys(records).join(', ');
    str = Object.values(records).map(e=> "'"+e+"'").join(', ');
    pool.query(`INSERT INTO ${table} (${str2}) VALUES(${str})`, (err,result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
    
})

    //select all
router.get('/:table', (req,res)=>{
    let table=req.params.table;
    pool.query(`SELECT * FROM ${table}`, (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

    //select one
router.get('/:table/:field/:value', (req,res)=>{
    let table=req.params.table;
    let field=req.params.field;
    let value=req.params.value;
    pool.query(`SELECT * FROM ${table} WHERE ${field}=${value}`, (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

    //delete one 
router.delete('/:table/:field/:value', (req,res)=>{
    let table=req.params.table;
    let field=req.params.field;
    let value=req.params.value;

    pool.query(`DELETE FROM ${table} WHERE ${field}=${value}`, (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

    //delete all 
router.delete('/:table', (req,res)=>{
    let table=req.params.table;

    pool.query(`DELETE FROM ${table}`, (err, result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

    //update one
router.patch('/:table/:field/:value', (req,res)=>{
    let table=req.params.table;
    let records=req.body;
    let field=req.params.field;
    let value=req.params.value;
    let fields=Object.keys(records);
    let values=Object.values(records);
    let str= "";

    for (let i = 0; i < fields.length; i++) {
        str+= fields[i]+"='"+values[i]+"'";
        if(fields.length-1!=i) str+=",";
    }

    pool.query(`UPDATE ${table} SET ${str} WHERE ${field}=${value}`, (err,result)=>{
        if(err) res.status(500).send(err);
        else res.status(200).send(result);
    })
})

module.exports=router;