const express = require('express');
const app = express();
const fs = require('fs');
const rootPath = process.env.PWD;
const data = `${rootPath}/models/data/city.list.json`;
const logger = require(`${rootPath}/config/logger/init.js`);
const api = require('./api/init.js');
//API call - example
// api.openweathermap.org/data/2.5/forecast/daily?q={city name},{country code}&cnt={cnt}

// Parameters:
// q city name and country code divided by comma, use ISO 3166 country codes
// cnt number of days returned (from 1 to 16)

//API factory - 
// by city name - api.openweathermap.org/data/2.5/forecast/daily?q={city name} "Sofia"
// by city id - api.openweathermap.org/data/2.5/forecast/daily?id=524901 
// by geo coords -  api.openweathermap.org/data/2.5/forecast/daily?lat=35&lon=139&cnt=10 


// GET : All cities
app.get('/', (req, res) => {
    fs.readFile(data, function (err, data) {
        if (err) {
            return console.error(err);
        }
        return res.status(200).send(data.toString())
    });
});

// GET : Single city from Input
app.get('/:city', (req, res) => {
    return res.send('Ok')
});

// POST : city name
app.post('/', (req, res) => {
    return res.send('everything is ok')
});


// app.post('/', function (req, res) {
//   return res.send('POST request to homepage');
// });


module.exports = app;