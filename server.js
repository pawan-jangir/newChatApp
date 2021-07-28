const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const mongoClient = require('mongodb').MongoClient;
const moment = require('moment');
var bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoose = require('mongoose');

const port = 3002;
const database = 'mongodb://localhost:27017/chatApp';

mongoose.connect(database, {}, function(err, db) {
  if (err) throw err;
  console.log("Connection established with database:");
});

const chatRoutes = require('./routes/chatRoutes');
const app = express();

// Allow Cross-Origin requests
app.use(cors());

// Set security HTTP headers
app.use(helmet());

app.use(bodyParser.urlencoded({
	extended: true,
	limit	: '50mb',
    parameterLimit : 1000000
}));
app.use(bodyParser.json());

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '15kb'
}));

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Routes
app.use('/api/chats', chatRoutes);
// allowed to access statically front folder using chat.html
app.use(express.static(path.join(__dirname,'front')));

// handle undefined Routes
app.use('*', (req, res, next) => {
    next(req, res, next);
});

const server=http.createServer(app);
const io = socketio(server);
require('./chat')(app, io);


server.listen(port, () => {
    console.log(`Chat Server listening to port ${port}...`);
});