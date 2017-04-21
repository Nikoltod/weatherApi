const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require(`${process.env.PWD}/config/logger/init.js`);

//using body parser for every request
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/api', require(`${process.env.PWD}/web/router/index.js`))
//export to server.js
module.exports = app