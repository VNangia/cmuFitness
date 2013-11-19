
/**
 * Module dependencies.
 */

var express = require('express'),
    mongo = require('mongodb'),
    mongoose = require('mongoose');

var config = require('./server/config.js');
var xsrf = require('./server/auth/xsrf.js');
var protectJSON = require('./server/auth/protectJSON.js');

var http = require('http');
var path = require('path'); 
var Mongoose = require('mongoose');
//fitnesstracker db name?
var db = Mongoose.createConnection('localhost','fitnesstracker');

var app = express();
var server = http.createServer(app);

app.use(protectJSON);
// set up all environments
// order in which middleware is invoked is important, since they are invoked sequentially
app.set('port', process.env.PORT || config.server.listenPort);
app.use(express.favicon());
app.use(express.logger('dev')); //Log requests to the console
app.use(express.json());  //to allow json on req/res
app.use(express.urlencoded()); //to allow url encoding
app.use(express.methodOverride()); //to allow PUT and DELETE support
app.use(app.router); 
//the directory where static files are located
app.use(express.static(path.join(__dirname, 'dist'))); 
                          
// Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method
app.use(express.bodyParser());    
// Hash cookies with this secret
app.use(express.cookieParser(config.server.cookieSecret));  
// Store the session in the (secret) cookie
//app.use(express.cookieSession());  
app.use(express.session({ secret: 'ahsdjfhiwehfuiahdkf' })); 

//var connectionURI = process.env.MONGOLAB_URI ||
  //  "mongodb://localhost:27017/cmufit";                        


//===========================
//  init database
//===========================
mongoose.connect('mongodb://localhost:27017/cmufit');
var database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function() {
    // yay!
    initializeRoutes();
    app.listen(3000);
    console.log("Created server on port: ");
});



// development only
if (app.get('env') == 'development') {
// A standard error handler - it picks up any left over errors and returns a nicely formatted server 500 error
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

function initializeRoutes() {
  require('./server/routes/base.js').addRoutes(app, config);
  require('./server/auth/auth.js').addRoutes(app);
}









