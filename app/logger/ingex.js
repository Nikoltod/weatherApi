const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
//where the file will be saved -- __dirname = E:/Projects/api/app/logger + log


//where to save
const loggerSaveLocation = `${__dirname}/log`;
// - /log folder inside the logger
//how to save 

    // make a file - check if there is a existing file if there is wipe it clean.
    // write on that file - in a specific format
        //must have timestamp when the error happened
        //stack trace

    //either choose to log the error that breaks the API or choose to log all the errors
        //must cover edge case - when more than one error occurs
    
//save
    //save the file and it's contents in the desired location 
module.exports = app