/* pass object in config.js */
exports.addRoutes = function(app, config) {
  // This route deals enables HTML5Mode by forwarding missing files to the index.html
  /*** TODO::: if logged in, redirect to /index ******/
  app.get('/home', function(request, response) {
    // Just send the index.html for other files to support HTML5Mode
    response.sendfile('index.html', { root: config.server.distFolder });
  });

  app.get('/register', function(request, response) {
    // Just send the index.html for other files to support HTML5Mode
    response.sendfile('index.html', { root: config.server.distFolder });
  });


  app.get('/index', function(request, response) {
    // Just send the index.html for other files to support HTML5Mode
    response.sendfile('index.html', { root: config.server.distFolder });
  });

};