const express = require('express')
const app = express()
const fs = require('fs')
const bulkData = `${__dirname}\\data\\city.list.json`


//API call
// api.openweathermap.org/data/2.5/forecast/daily?q={city name},{country code}&cnt={cnt}

// Parameters:
// q city name and country code divided by comma, use ISO 3166 country codes
// cnt number of days returned (from 1 to 16)

//API factory - 
// by city name - api.openweathermap.org/data/2.5/forecast/daily?q={city name} "Sofia"
// by city id - api.openweathermap.org/data/2.5/forecast/daily?id=524901 
// by geo coords -  api.openweathermap.org/data/2.5/forecast/daily?lat=35&lon=139&cnt=10 
function apiCall(method, options) {
    const url = "api.openweathermap.org/data/2.5/forecast/daily";
    //setup 
    options.method = options.method.toUpperCase();
    const xhr = new XMLHttpRequest();
    //set the MIME type of the request only for POST-ing data
    if(options.method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    //handling the server response - you can do it either with a function or anonymous function
    xhr.onreadystatechange = handleServerResponse;
    //making the request to the server with .open() and .send()
    xhr.open(options.method, url, true); // the last param is whether the call should be async - it's true by default


    //TODO : make a function to handle the options if there are several ones - to loop through the options and get them all
    var requestData = handleArguments(options.method, options.params); // handle an object of params
    //sending the request and any data to the server as a param
    xhr.send(requestData); // could be null - if any problems occur - handle with if(options.method === "POST")
    
}
//testing purposes only
//var p = { 'something':'awesome', 'something1':'awesome', 'something2':'awesome', 'something3':'awesome', 'something4':'awesome', 'something5':'awesome'};
function handleArguments(method, args) {
    // 'name' : 'param' - http://www.w3schools.com/tags/ref_httpmethods.asp
    //GET : ?name1=value1&name2=value2 - sent in the HEAD of the request
    //POST : name1=value1&name2=value2 - sent in the BODY of the request 
    let result = '';
    //need to attach an & at the end of each key=value pair but not on the last one!!
    for(arg in args) {
        result += arg + '=' + args[arg] + '&';        
    }
    //remove the last character from the string - that's an array of characters
    result = result.slice(0, -1); 

    //if we're dealing with a GET scenario    
    if(method === 'GET') {
        result = '?' + result;
    } 
    //return the params for the request .send() method
    return result;    
}
//handleArguments('POST', p);
//above code except the function if for testing purposes

function handleServerResponse() {
    const response;
    try {
    //check the state of the request 
    if(xhr.readyState === XMLHttpRequest.DONE) {
        //the request has finished
        if(xhr.status === 200) {
            //the server response if 'OK'
            response = xhr.responseXML; //returns XMLDocument object you can traverse using the JavaScript DOM functions - not a good idea to return server response text
        } 
        return result;
        // else {
        //     //there was an problem with the request
        //         //TODO : write a logger for the errors 
        //             //Log the error in a file
        // }
    } 
    // else {
    //     //do something else - request hasn't finished - either XMLHttpRequest.OPENED or XMLHttpRequest.LOADING
    // }
    } catch(e) {
        //there was an problem with the request
                //TODO : write a logger for the errors 
                    //Log the error in a file
    }

}


// GET : All cities
app.get('/', (req, res) => {
    fs.readFile(bulkData, function (err, data) {
        if (err) {
            return console.error(err);
        }
        return res.status(200).send(data.toString())
    });
})

// GET : Single city from Input
app.get('/:city', (req, res) => {
    const data = apiCall('get');
    return res.send('Ok')
})

// POST : city name
app.post('/', (req, res) => {
    return res.send('everything is ok')
})


// app.post('/', function (req, res) {
//   return res.send('POST request to homepage');
// });


module.exports = app