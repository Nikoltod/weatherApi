const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const logFile = `${__dirname}/log/api-log.txt`;
const wipeLog = function(fileName) {
    fs.writeFileSync(fileName, '');
}
const writeLog = function(file, data) {
    var stream = fs.createWriteStream(file, {'flags': 'a', 'encoding': 'utf8'});
        stream.write(data);
        stream.end();
}

module.exports = {
    log: function (data) {
        wipeLog(logFile);
        writeLog(logFile, data);
    }
}