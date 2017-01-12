const express = require('express');
const app = express();
const fs = require('fs');
const bulkData = '../../../models/data/city.list.json';


//API call - example
// api.openweathermap.org/data/2.5/forecast/daily?q={city name},{country code}&cnt={cnt}

// Parameters:
// q city name and country code divided by comma, use ISO 3166 country codes
// cnt number of days returned (from 1 to 16)

//API factory - 
// by city name - api.openweathermap.org/data/2.5/forecast/daily?q={city name} "Sofia"
// by city id - api.openweathermap.org/data/2.5/forecast/daily?id=524901 
// by geo coords -  api.openweathermap.org/data/2.5/forecast/daily?lat=35&lon=139&cnt=10 
function apiCall(method, options) {
    let url = "api.openweathermap.org/data/2.5/forecast/daily";
    const xhr = new XMLHttpRequest();
    options.method = options.method.toUpperCase();
    
    if(options.method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    
    xhr.onreadystatechange = handleServerResponse;

    xhr.open(options.method, url, true);

    let requestData = handleArguments(options.method, options.params); 

    xhr.send(requestData); // could be null - if any problems occur - handle with if(options.method === "POST")
    
}

function handleArguments(method, args) {
    let result = '';

    for(arg in args) {
        result += arg + '=' + args[arg] + '&';        
    }
    result = result.slice(0, -1); 
    
    if(method === 'GET') {
        result = '?' + result;
    } 

    return result;    
}

function handleServerResponse() {
    const response = null;
    try { 
    if(xhr.readyState === XMLHttpRequest.DONE) {
        //the request has finished
        if(xhr.status === 200) {
            //the server response if 'OK'
            response = xhr.responseXML; //returns XMLDocument object you can traverse using the JavaScript DOM functions - not a good idea to return server response text
        } 
        return result;
    } 
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