/* pass object in config.js */
exports.addRoutes = function(app, config) {
  // This route deals enables HTML5Mode by forwarding missing files to the index.html
  app.get('/test', function(request, response) {
    // Just send the index.html for other files to support HTML5Mode
    response.sendfile('index.html', { root: config.server.distFolder });
  });
};