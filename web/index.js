const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('../config/components/logger/init.js');

// let err = new Error(`this is my custom error to be handled`);

// logger(err);

//using body parser for every request
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api', require('./router/api'))
//export to server.js
module.exports = app