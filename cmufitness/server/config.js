var path = require('path');

module.exports = {
	
  mongo: {
    dbUrl: 'https://api.mongolab.com/api/1',    // The base url of the MongoLab DB server
    apiKey: '1cdItjlWfu1UqADCFNW8HB-oYE1piI7X', // Our MongoLab API key
  },
  security: {
    dbName: 'fitnesstracker',    // The name of database that contains the security information
    usersCollection: 'users'     // The name of the collection contains user information
  },
  server: {
    listenPort: 3000,                                   // The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
    securePort: 8433,                                   // The HTTPS port on which the server is to listen (means that the app is at https://localhost:8433 for instance)
    distFolder: path.resolve(__dirname, '../dist'),
    cookieSecret: 'cmufitcookie' //change later?  
    // __dirname is the path of the current file
    // equivalent to cd .., cd dist
    // The folder that contains the application files (note that the files are in a different repository) - relative to this file
  }

};