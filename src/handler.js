const fs = require('fs');
const url = require('url');
const articleResponse = require('./api.js')

function handler (request, response) {
    const endpoint = request.url; 
    if (endpoint === "/") {
        sendResponse(response, "index.html", "text/html")
    } else if(endpoint.includes(".css")){
        sendResponse(response, endpoint, "text/css")  
    } else if(endpoint.startsWith("/article")){
        var data = '';
        request.on('data', function (chunk) {
            data += chunk;
        });
        request.on('end', function () {
            sendArticleResponse(data, response);    
        });
    }
    else {
        sendResponse(response, endpoint, "application/javascript")     
    }
}

function sendResponse(response, fileName, contentType) {
    fs.readFile(__dirname + '/../public/' + fileName, function(error, file) {
        if (error) {
            response.writeHead(404, {"Content-Type": "text/html"});
            response.write("Resource not found");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type": contentType});
            response.end(file);
        }
    });
}

function sendArticleResponse(data, response) {
    var json = JSON.parse(data);
    articleResponse(json.searchTerm, json.source).then(
        content => {
            response.writeHead(200, {"Content-Type": "application/json"});
            response.write(JSON.stringify(content));
            response.end();
        }
    );
}

module.exports = handler;