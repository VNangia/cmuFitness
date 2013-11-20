/*=============================================
     MongoDB Account Manager for Users collection
=============================================*/
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passwordTools = require('./passwordTools.js');


function UserAuthService(UserModel) {
  this.User = UserModel;
}

UserAuthService.prototype.getUserAccount = function(username, password, done) {
  this.User.findOne({username: username}, 
    function(err, result) {
      if (err)
        done(err, null);
      else if (result == null) {
        done('User does not exist', null);
      }
      else if (!passwordTools.validatePassword(password, result.password)) {
        done('Bad password', null); //wrong password entered
      }
      else {
        done(err, result);
      }
  });
}

/***** FIX DUPLICATE USER CREATION *******/
UserAuthService.prototype.createNewUser = function(username, password, email, done){
    var newUser = new this.User({ 
            username: username, 
            password: passwordTools.hashPassword(password), //store hashed password
            email: email
        });
    console.log("new");
    console.log(newUser);
    newUser.save(function(err, result){
            if (err && err.err.indexOf('duplicate key error') !== -1)
                done('username already exists', null);
            else if (err) {
                done(err, null);              
            }
            else {
                done(err, result);
            }
        });
}

module.exports = UserAuthService;
