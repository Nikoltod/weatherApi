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
    //free up the variable
    delete stream;
}

const LogError = function(error) {
    var date = new Date().toString(),
        date = date.slice(0, 28);
    wipeLog(logFile);
    writeLog(logFile, `${date}, ${error.stack}`);
    
    delete date;
}

module.exports = {
    log: (data) => {
        wipeLog(logFile);
        writeLog(logFile, data);
    },
    logError: (error) => {
        LogError(error);
    }
}