var UserAuthAction = require('./UserAuthAction.js'),
    UserAuthService = require('./UserAuthService.js'),
    UserSchema = require('../userModel.js');

exports.addRoutes = function(app) {

  var userAuthService = new UserAuthService(UserSchema);
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
    response.clearCookie('username');
    response.clearCookie('password');
    response.clearCookie('account');
    delete request.session.username;
  });


  app.post('/register', function(request, response){
    userAuthAction.register(request, response, function(err, result){
      if (err) {
        response.send(err);
      } else {
        response.send(result);
      }
    });
  });

}



// Retrieve the current user
