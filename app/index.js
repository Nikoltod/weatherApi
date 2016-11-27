const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('./logger');

//using body parser for every request
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api', require('./api'))
//export to server.js
module.exports = app