require('dotenv').config();
const express = require('express');
var mysql = require('mysql');
const moment = require('moment');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const app = express();
const version = process.env.VERSION;

app.get('/', (req, res) => {
    log(req.socket.remoteAddress, `Sent version information.`);
    res.status(200).send(`2/14.szft Backend API ${version}.`);
});

