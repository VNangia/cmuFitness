/* cmufit is the name of our ng-app as in index.html */
/* cmufit.templates is the module name as declared in the grunt file */
angular.module('cmufit', ['cmufit.templates'])
  .config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/test', {templateUrl: 'templates/home.ng'}).
      otherwise({redirectTo: '/'});
  });

angular.module('cmufit').constant('MONGOLAB_CONFIG', {
  baseUrl: '/databases/',
  dbName: 'fitnesstracker'
});