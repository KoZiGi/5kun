require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const moment = require('moment');
const path = require('path');
const cors = require('cors');
const app = express();
const version = process.env.VERSION;
const debug=process.env.DEBUG;
const multer = require('multer');
const upload = require('./controllers/files').upload;

app.get('/', (req, res) => {
    log(req.socket.remoteAddress, `Sent version information.`);
    res.status(200).send(`2/14.szft Backend API ${version}.`);
});

function log(req, res) {
    if (debug == 1) {
        var timestamp = moment(new Date()).format('yyyy-MM-DD HH:mm:ss');
        console.log(`[${timestamp}] : ${req} >>> ${res}`);
    }
}

//Middlewares
app.use('/assets',express.static(path.join(__dirname, '/assets')));
app.use('/views',express.static(path.join(__dirname, '/views')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//CONTROLLERS
const userController=require('./controllers/userController.js');
app.use('/api', userController);
app.use('/files', require('./controllers/files').Router);

app.listen(process.env.PORT)
