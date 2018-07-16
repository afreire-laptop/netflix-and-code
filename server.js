const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const app = express();
const server = http.createServer(app);

server.listen(port);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));