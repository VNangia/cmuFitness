
/**
 * Module dependencies.
 */

var express = require('express');
var config = require('./server/config.js'); 

var http = require('http');
var path = require('path'); 
var Mongoose = require('mongoose');
//fitnesstracker db name?
var db = Mongoose.createConnection('localhost','fitnesstracker');

var app = express();
var server = http.createServer(app);

// set up all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'))); // ??

// development only
if (app.get('env') == 'development') {
// A standard error handler - it picks up any left over errors and returns a nicely formatted server 500 error
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

require('./server/routes/base').addRoutes(app, config);

server.listen(config.server.listenPort);

/*
server.listen(config.server.listenPort, '0.0.0.0', 511, function() {
  console.log("listening");
  // // Once the server is listening we automatically open up a browser
  //var open = require('open');
  // open('http://localhost:' + config.server.listenPort + '/');
});

*/




