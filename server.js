const http = require('http');
const handler = require('./src/handler.js');
require('dotenv').config();
const server = http.createServer(handler);

server.listen(process.env.PORT || 5000, function () {
    console.log("Server has started");
});