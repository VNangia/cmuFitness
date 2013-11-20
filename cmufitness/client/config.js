/* cmufit is the name of our ng-app as in index.html */
/* cmufit.templates is the module name as declared in the grunt file */
angular.module('cmufit', ['cmufit.templates', 'ui.bootstrap', 'cmufit.auth'])
  .config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/home', {controller:'AuthController', templateUrl: '../client/templates/home.ng'}).
      when('/register', {controller:'AuthController', templateUrl: '../client/templates/register.ng'}).
      when('/index', {templateUrl: '../client/templates/index.ng'}). //dashboard page
      otherwise({redirectTo: '/'});
  })
  .constant('MONGOLAB_CONFIG', {
  baseUrl: '/databases/',
  dbName: 'fitnesstracker'
});