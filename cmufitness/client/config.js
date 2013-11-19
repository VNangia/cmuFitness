/* cmufit is the name of our ng-app as in index.html */
/* cmufit.templates is the module name as declared in the grunt file */
angular.module('cmufit', ['cmufit.templates', 'ui.bootstrap', 'cmufit.login'])
  .config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/home', {controller:'LoginController', templateUrl: '../client/templates/home.ng'}).
      when('/register', {controller:'LoginController', templateUrl: '../client/templates/register.ng'}).
      when('/index', {templateUrl: '../client/templates/index.ng'}).
      otherwise({redirectTo: '/'});
  })
  .constant('MONGOLAB_CONFIG', {
  baseUrl: '/databases/',
  dbName: 'fitnesstracker'
});