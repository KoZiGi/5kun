require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const moment = require('moment');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const app = express();
const version = process.env.VERSION;
const config = require('./config.js');

app.get('/', (req, res) => {
    log(req.socket.remoteAddress, `Sent version information.`);
    res.status(200).send(`2/14.szft Backend API ${version}.`);
});


//Middlewares
app.use('/assets',express.static(path.join(__dirname, '/assets')));
app.use('/views',express.static(path.join(__dirname, '/views')));
app.use(express.urlencoded({ extended: true }));


app.listen(config.appconfig.port, ()=>{
    console.log(`Server is listening on port ${config.appconfig.port}...`);
})