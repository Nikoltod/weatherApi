const logger = require(`${process.env.PWD}/config/logger/init.js`);

const handleArguments = (method, args) => {
    let result = '';
    for(arg in args) {
        result += arg + '=' + args[arg] + '&';        
    }

    result = result.slice(0, -1); 
    if(method === 'GET') {
        result = '?' + result;
    } 

    return result;    
};

const handleServerResponse = () => {
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
        logger.logError(e);
    }
};

module.exports = {
    //making a simple call to the api would be : api.call(method, options);
    call : (method, options) => {
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
};
