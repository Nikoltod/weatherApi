////
//*
//*
//* 
//* 
//* Will be changed due to the change in the logger.
//*
//*
//*
////


const logger = require("../config/components/logger/init.js");

function errorLoad() {
    for (var i = 0; i < 10; i++) {
        logger.log("error " + i + "\n");
    }
}
errorLoad();

console.log("execution finished on the log.");