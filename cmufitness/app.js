
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
// order in which middleware is invoked is important, since they are invoked sequentially
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev')); //register logger
app.use(express.json());  //to allow json on req/res
app.use(express.urlencoded()); //to allow url encoding
app.use(express.methodOverride()); //to allow PUT and DELETE support
app.use(app.router); 
app.use(express.static(path.join(__dirname, 'dist'))); //the directory where static files are located

// development only
if (app.get('env') == 'development') {
// A standard error handler - it picks up any left over errors and returns a nicely formatted server 500 error
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

require('./server/routes/base').addRoutes(app, config);

server.listen(config.server.listenPort, '0.0.0.0', 511, function() {
  console.log("listening");
});






