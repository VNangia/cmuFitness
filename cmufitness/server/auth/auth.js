var UserAuthAction = require('./UserAuthAction.js'),
    UserAuthService = require('./UserAuthService.js'),
    UserModel = require('../models/userModel.js');

exports.addRoutes = function(app) {

  var userAuthService = new UserAuthService(UserModel);
  var userAuthAction = new UserAuthAction(userAuthService);

  app.post('/login', function(request, response) {
    userAuthAction.login(request, response, function(err, result) {
      if (err) {
        response.send(err);
      }
      else {
        response.send(result);
      }
    });
  });

  app.post('/logout', function(request, response) {
    userAuthAction.logout(request, response);
  });


  app.post('/register', function(request, response){
    userAuthAction.register(request, response, function(err, result){
      if (err) {
        response.send(err);
      } 
      else {
        response.send(result);
      }
    });
  });

}




